import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function isSafePublicSupabaseKey(candidate: string): boolean {
  const trimmed = candidate.trim();
  if (!trimmed) return false;
  const jwtParts = trimmed.split('.');
  if (jwtParts.length >= 3 && trimmed.startsWith('eyJ')) {
    try {
      const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64url').toString('utf8'));
      if (payload?.role === 'service_role') return false;
    } catch {
      // Ignore non-JSON token segments
    }
  }
  return true;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  const resolvedSupabaseUrl = (
    env.VITE_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL ||
    env.SUPABASE_URL ||
    ''
  ).trim();

  const candidateAnonKey = (
    env.VITE_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.SUPABASE_ANON_KEY ||
    env.SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();

  const resolvedSupabaseAnonKey = isSafePublicSupabaseKey(candidateAnonKey)
    ? candidateAnonKey
    : '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __SUPABASE_URL_OVERRIDE__: JSON.stringify(resolvedSupabaseUrl),
      __SUPABASE_ANON_KEY_OVERRIDE__: JSON.stringify(resolvedSupabaseAnonKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
