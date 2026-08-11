import type { ProductPagesConfig } from '@/features/product-pages/types';

export const PRODUCT_PAGES = {
  pricing: { status: 'public', mode: 'project' },
  contact: { status: 'public' },
  blog: { status: 'off' },
  integrations: {
    status: 'public',
    records: [
      { id: 'pdf', name: 'PDF', icon: 'solar:document-bold-duotone', category: 'businessSystems', connection: 'file', status: 'available', dataFlow: 'documents' },
      { id: 'camera', name: 'Camera', icon: 'solar:camera-bold-duotone', category: 'businessSystems', connection: 'file', status: 'available', dataFlow: 'documents' },
      { id: 'oris', name: 'ORIS', icon: 'solar:calculator-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'accountingDrafts' },
      { id: 'balance-1c', name: 'Balance / 1C', icon: 'solar:database-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'accountingDrafts' },
    ],
  },
  security: { status: 'public' },
  privacy: { status: 'public' },
  terms: { status: 'public' },
  cookies: { status: 'off' },
  solutions: { status: 'off', slugs: [] },
  localeNamespaces: {
    ka: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    en: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    ru: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
  },
} as const satisfies ProductPagesConfig;
