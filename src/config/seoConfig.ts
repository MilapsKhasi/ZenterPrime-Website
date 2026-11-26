export interface PageSeoConfig {
  pageName: string;
  description: string;
  path: string;
  sectionId?: string;
  structuredData?: Record<string, unknown>;
}

const SOFTWARE_OFFERS = {
  '@type': 'AggregateOffer',
  priceCurrency: 'INR',
  lowPrice: '0',
  highPrice: '24999',
  offerCount: '4',
  offers: [
    { '@type': 'Offer', name: 'Educational Free', price: '0', priceCurrency: 'INR' },
    { '@type': 'Offer', name: 'Standard Monthly', price: '499', priceCurrency: 'INR' },
    { '@type': 'Offer', name: 'Standard Yearly', price: '4999', priceCurrency: 'INR' },
    { '@type': 'Offer', name: 'Lifetime Access', price: '24999', priceCurrency: 'INR' },
  ],
};

export function getPageSeoByPath(pathname: string, isReleased: boolean): PageSeoConfig {
  const normalized = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  switch (normalized) {
    case '/features':
      return {
        pageName: 'Features',
        path: '/features',
        sectionId: 'features',
        description:
          'Explore ZenterPrime 7.4 Desktop features: Sales Invoices, Purchase Bills, Payment Receipts, Party Ledgers, Inventory Stock Tracking, and Cashbook Reports.',
      };

    case '/gst-billing':
      return {
        pageName: 'GST Billing',
        path: '/gst-billing',
        sectionId: 'gst-billing',
        description:
          'Automate Indian GST compliance in ZenterPrime 7.4 with CGST, SGST, and IGST splits, HSN/SAC masters, ITC reconciliation, and GSTR-1 & GSTR-3B summaries.',
      };

    case '/advantages':
      return {
        pageName: 'Desktop Advantages',
        path: '/advantages',
        sectionId: 'advantages',
        description:
          'Run retail billing offline with zero internet dependency, direct USB/COM thermal receipt printing, multi-company management, and instant keyboard shortcuts.',
      };

    case '/backup-restore':
      return {
        pageName: 'Backup & Restore',
        path: '/backup-restore',
        sectionId: 'backup-restore',
        description:
          'Protect shop accounting records with encrypted local SQLite storage, 1-click .json company backups, USB drive export, and instant ledger restoration.',
      };

    case '/pricing':
      return {
        pageName: 'Pricing',
        path: '/pricing',
        sectionId: 'pricing',
        description:
          'Transparent ZenterPrime 7.4 pricing for Indian businesses: Monthly at ₹499, Yearly at ₹4,999, Lifetime at ₹24,999, and Educational Free learning edition.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'ZenterPrime 7.4 Desktop',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Windows 10, Windows 11',
          description:
            'Offline-first GST billing and retail accounting software with Monthly (₹499), Yearly (₹4,999), Lifetime (₹24,999), and Educational Free plans.',
          offers: SOFTWARE_OFFERS,
        },
      };

    case '/launch-countdown':
      return {
        pageName: isReleased ? 'Official Release' : 'Launch Countdown',
        path: '/launch-countdown',
        sectionId: 'launch-countdown',
        description: isReleased
          ? 'ZenterPrime 7.4 Desktop is officially released for Windows. Download the standalone offline installer and activate your business license.'
          : 'Countdown to the official ZenterPrime 7.4 Desktop release on 31 December 2026 at 00:00 IST. Try the 14-day web preview or reserve a license early.',
      };

    case '/download':
      return {
        pageName: isReleased ? 'Download' : 'Launch Countdown',
        path: isReleased ? '/download' : '/launch-countdown',
        sectionId: isReleased ? 'download' : 'launch-countdown',
        description: isReleased
          ? 'Download ZenterPrime 7.4 Desktop standalone Windows installer (ZenterPrime.Setup.7.4.0.exe) with SHA-256 verification and offline SQLite engine.'
          : 'ZenterPrime 7.4 Desktop Windows installer unlocks on 31 December 2026 at 00:00 IST. Track the live launch countdown and try the web preview.',
      };

    case '/faq':
    case '/support':
      return {
        pageName: 'Support & FAQ',
        path: normalized,
        sectionId: 'faq',
        description:
          'Find answers on ZenterPrime 7.4 offline desktop billing, GST compliance, 1-click .json backups, Windows compatibility, and license activation.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Does ZenterPrime work completely offline?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. ZenterPrime 7.4 is a native Windows desktop software where billing, inventory, party ledgers, and cashbook records run 100% offline.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is GST compliance supported for Indian businesses?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. ZenterPrime calculates CGST, SGST, and IGST splits, supports HSN/SAC codes, and generates GSTR-1 and GSTR-3B summary reports.',
              },
            },
            {
              '@type': 'Question',
              name: 'How does data backup and company restore work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can create a 1-click .json backup of your company ledger, save it to USB drives, and restore within seconds on any Windows PC.',
              },
            },
          ],
        },
      };

    case '/renew':
      return {
        pageName: 'Renew License',
        path: '/renew',
        description:
          'Renew your ZenterPrime 7.4 Desktop license and support subscription using your registered email address and Device Machine ID.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Renew License | ZenterPrime',
          description:
            'Look up existing ZenterPrime licenses by email and renew support or subscription terms securely.',
        },
      };

    case '/reactivate':
      return {
        pageName: 'Reactivate License',
        path: '/reactivate',
        description:
          'Verify your registered email address to retrieve and reactivate your ZenterPrime 7.4 Desktop product keys on a new or formatted Windows PC.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Reactivate License | ZenterPrime',
          description:
            'Retrieve and reactivate your existing ZenterPrime 7.4 license key for Windows Desktop.',
        },
      };

    case '/':
    default:
      return {
        pageName: 'Home',
        path: '/',
        description: isReleased
          ? 'ZenterPrime 7.4 Desktop is an offline-first Windows accounting software with GST billing, party ledgers, inventory, backups, and Monthly, Yearly, or Lifetime plans.'
          : 'ZenterPrime 7.4 Desktop is offline-first Windows accounting software with GST billing, ledgers, and inventory. Launching 31 Dec 2026 IST with Monthly, Yearly & Lifetime plans.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'ZenterPrime 7.4 Desktop',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Windows 10, Windows 11',
          description:
            'Offline-first retail business accounting software for Windows featuring GST billing, party ledgers, inventory tracking, cashbook, and 1-click backups.',
          offers: SOFTWARE_OFFERS,
        },
      };
  }
}
