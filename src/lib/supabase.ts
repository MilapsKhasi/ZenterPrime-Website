import { createClient } from '@supabase/supabase-js';

declare const __SUPABASE_URL_OVERRIDE__: string | undefined;
declare const __SUPABASE_ANON_KEY_OVERRIDE__: string | undefined;

function normalizeSupabaseAnonKey(rawKey: string, url: string): string {
  const cleaned = rawKey.trim().replace(/^["']|["']$/g, '');
  const jwtMatches = cleaned.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g);
  if (!jwtMatches || jwtMatches.length === 0) {
    return cleaned;
  }
  if (jwtMatches.length === 1) {
    return jwtMatches[0];
  }

  const refMatch = url.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co/i);
  const targetRef = refMatch?.[1]?.toLowerCase();
  if (targetRef && typeof atob === 'function') {
    for (const token of jwtMatches) {
      try {
        const payloadB64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(payloadB64));
        if (typeof payload?.ref === 'string' && payload.ref.toLowerCase() === targetRef) {
          return token;
        }
      } catch {
        // Ignore non-JSON token segment
      }
    }
  }

  return jwtMatches[0];
}

const DEFAULT_PUBLIC_SUPABASE_URL = 'https://blbaolnlzohguwqiyflg.supabase.co';
const DEFAULT_PUBLIC_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsYmFvbG5sem9oZ3V3cWl5ZmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMjY2ODgsImV4cCI6MjA4MzcwMjY4OH0.nGCG_M3-m2hNnP8Nu0aftZ1Ug0OheU5GmbGNr-Iwxxg';

// Base URL clean up (removes trailing /rest/v1/ if user provided it)
const envMeta = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};
const rawUrl = (
  envMeta.VITE_SUPABASE_URL ||
  (typeof __SUPABASE_URL_OVERRIDE__ !== 'undefined' ? __SUPABASE_URL_OVERRIDE__ : '') ||
  DEFAULT_PUBLIC_SUPABASE_URL
).trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const rawAnonKey = (
  envMeta.VITE_SUPABASE_ANON_KEY ||
  (typeof __SUPABASE_ANON_KEY_OVERRIDE__ !== 'undefined' ? __SUPABASE_ANON_KEY_OVERRIDE__ : '') ||
  DEFAULT_PUBLIC_SUPABASE_ANON_KEY
).trim();
const supabaseAnonKey = normalizeSupabaseAnonKey(rawAnonKey, supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LicenseRecord {
  id?: string | number;
  license_id: string;
  registered_email: string;
  is_active: 'YES' | 'NO' | string;
  plan: string;
  expiry: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Calculates the last day of the current month in YYYY-MM-DD format
 */
export function getLastDayOfCurrentMonth(): string {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const yyyy = lastDay.getFullYear();
  const mm = String(lastDay.getMonth() + 1).padStart(2, '0');
  const dd = String(lastDay.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Calculates the last day of the upcoming month in YYYY-MM-DD format (for renewals)
 */
export function getLastDayOfUpcomingMonth(): string {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 0);
  const yyyy = lastDay.getFullYear();
  const mm = String(lastDay.getMonth() + 1).padStart(2, '0');
  const dd = String(lastDay.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Generates a unique license ID in format: ZP-730-XXXX-XXXX
 */
export function generateLicenseId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const randSegment = (len = 4) => {
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };
  return `ZP-730-${randSegment(4)}-${randSegment(4)}`;
}

/**
 * 1. Inserts a new license into the 'licenses' Supabase table
 */
export async function createSupabaseLicense(
  email: string,
  planName: string,
  isMonthly: boolean
): Promise<{ success: boolean; data?: LicenseRecord; error?: string }> {
  try {
    const licenseId = generateLicenseId();
    // In Supabase PostgreSQL, 'expiry' is a DATE column.
    // Monthly plan requires a valid YYYY-MM-DD date string.
    // Lifetime plans use null for expiry (unlimited / lifetime validity).
    const expiryDate: string | null = isMonthly ? getLastDayOfCurrentMonth() : null;

    const newRecord: LicenseRecord = {
      license_id: licenseId,
      registered_email: email.trim().toLowerCase(),
      is_active: 'YES',
      plan: planName,
      expiry: expiryDate,
    };

    const { data, error } = await supabase
      .from('licenses')
      .insert([newRecord])
      .select();

    if (error) {
      console.warn('Supabase license insert notice:', error);
      return { 
        success: false, 
        data: newRecord,
        error: error.message 
      };
    }

    const inserted = data && data[0] ? (data[0] as LicenseRecord) : newRecord;
    return { success: true, data: inserted };
  } catch (err: any) {
    console.error('Error inserting license into Supabase:', err);
    return {
      success: false,
      data: {
        license_id: generateLicenseId(),
        registered_email: email,
        is_active: 'YES',
        plan: planName,
        expiry: isMonthly ? getLastDayOfCurrentMonth() : null,
      },
      error: err?.message,
    };
  }
}

/**
 * 2. Fetches existing license(s) by registered email
 */
export async function fetchLicensesByEmail(
  email: string
): Promise<{ success: boolean; data: LicenseRecord[]; error?: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .ilike('registered_email', cleanEmail)
      .order('id', { ascending: false });

    if (error) {
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: (data as LicenseRecord[]) || [] };
  } catch (err: any) {
    return { success: false, data: [], error: err?.message || 'Database query failed' };
  }
}

/**
 * 3. Renews a monthly license for ₹499:
 *    Updates 'expiry' to last day of upcoming month and 'is_active' to 'YES'
 */
export async function renewSupabaseLicense(
  licenseId: string,
  registeredEmail: string
): Promise<{ success: boolean; newExpiry?: string; error?: string }> {
  try {
    const upcomingExpiry = getLastDayOfUpcomingMonth();

    const { error } = await supabase
      .from('licenses')
      .update({
        expiry: upcomingExpiry,
        is_active: 'YES',
      })
      .or(`license_id.eq.${licenseId},registered_email.ilike.${registeredEmail.trim().toLowerCase()}`);

    if (error) {
      console.warn('Supabase renewal error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, newExpiry: upcomingExpiry };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Renewal update failed' };
  }
}

/**
 * 4. Reactivates a deactivated license (is_active = 'NO' -> 'YES')
 */
export async function reactivateSupabaseLicense(
  licenseId: string,
  registeredEmail: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('licenses')
      .update({
        is_active: 'YES',
      })
      .or(`license_id.eq.${licenseId},registered_email.ilike.${registeredEmail.trim().toLowerCase()}`);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Reactivation failed' };
  }
}

/**
 * 5. Fetches authoritative PostgreSQL server time via public.get_server_time RPC
 *    and compensates for half round-trip network latency using monotonic performance.now().
 */
export async function fetchSupabaseServerTimeMs(): Promise<{
  success: boolean;
  serverTimeMs?: number;
  error?: string;
}> {
  try {
    const reqStartPerf = performance.now();
    const { data, error } = await supabase.rpc('get_server_time');
    const reqEndPerf = performance.now();

    if (error) {
      return { success: false, error: error.message };
    }

    if (typeof data !== 'string' && typeof data !== 'number') {
      return { success: false, error: 'Invalid server timestamp response' };
    }

    const parsedMs = typeof data === 'number' ? data : Date.parse(data);
    if (!Number.isFinite(parsedMs)) {
      return { success: false, error: 'Unable to parse server timestamp' };
    }

    const halfRttMs = Math.max(0, (reqEndPerf - reqStartPerf) / 2);
    return {
      success: true,
      serverTimeMs: Math.round(parsedMs + halfRttMs),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to fetch Supabase server time',
    };
  }
}
