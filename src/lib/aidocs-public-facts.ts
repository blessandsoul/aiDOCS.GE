export const AIDOCS_BASE_URL = "https://aidocs.ge";

export const AIDOCS_PUBLIC_FACTS = {
  brand: { name: "aiDOCS", url: AIDOCS_BASE_URL, provider: "aiNOW", type: "document processing service" },
  purpose: "Document extraction into reviewed ledger drafts for Georgian accounting firms.",
  audience: "Georgian accounting firms and outsourced bookkeepers, plus customs brokers and freight forwarders.",
  inputs: ["bank statement PDFs", "foreign supplier invoices", "customs and import paperwork", "photographed fiscal receipts", "agreed PDF, scan, photo or email attachment sources"],
  outputs: ["review-ready rows for ORIS", "review-ready rows for Balance", "review-ready rows for 1C", "an agreed accounting file"],
  boundaries: [
    "Structured domestic tax invoices already available in rs.ge are outside the standard scope.",
    "Handwriting recognition is outside the standard scope.",
    "No general accuracy percentage is published; selected samples are measured instead.",
    "aiDOCS produces a draft and the client's accountant reviews and approves before posting.",
  ],
  pricing: { status: "unknown", note: "Setup and ongoing terms are confirmed in writing after the document sample and output scope are understood." },
  serviceLanguages: ["ka", "en", "ru"],
  siteLocales: ["ka", "en", "ru"],
  lastUpdated: "2026-10-07",
  contact: { email: "CONTACT@aiNOW.GE", url: `${AIDOCS_BASE_URL}/contact` },
} as const;

export const AIDOCS_FAQS = [
  { question: "What does aiDOCS process?", answer: "Selected bank statements, foreign supplier invoices, customs paperwork and photographed receipts are the starting scope; the exact document type is confirmed from a sample." },
  { question: "What happens to an unclear value?", answer: "It stays visible for human review. aiDOCS prepares a draft and does not silently make an unclear amount, date, ID or supplier field a final posting." },
  { question: "Can it post entries automatically?", answer: "No automatic final posting is promised. A reviewed file can be shaped for ORIS, Balance, 1C or another agreed destination when a safe import path is documented." },
  { question: "Do you promise a general accuracy percentage?", answer: "No. Selected sample documents are measured and the review boundary is documented." },
  { question: "What should we prepare?", answer: "A representative document sample, required fields, target output columns and the person responsible for final review." },
] as const;

export const AIDOCS_SEO_COPY = {
  ka: { title: "aiDOCS: დოკუმენტების დამუშავება და საბუღალტრო შემოწმება", description: "aiDOCS შერჩეულ დოკუმენტებში საჭირო ველებს იღებს, საეჭვო მნიშვნელობებს აჩვენებს და გატარებამდე ბუღალტრისთვის სტრუქტურირებულ ჩანაწერებს ამზადებს." },
  en: { title: "aiDOCS: document processing automation for business", description: "aiDOCS extracts selected document fields, marks uncertain values and prepares structured rows for accountant review before posting." },
  ru: { title: "aiDOCS: автоматизация обработки документов для бизнеса", description: "aiDOCS извлекает выбранные поля документов, отмечает неясные значения и готовит структурированные строки для проверки бухгалтером до проводки." },
} as const;

export function getAiDocsSeoCopy(locale: string): (typeof AIDOCS_SEO_COPY)[keyof typeof AIDOCS_SEO_COPY] {
  return AIDOCS_SEO_COPY[locale === "ka" || locale === "ru" ? locale : "en"];
}

export function serializeAiDocsJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function buildAiDocsSummary(): Record<string, unknown> {
  return {
    schemaVersion: "aidocs.public-summary.v1",
    name: AIDOCS_PUBLIC_FACTS.brand.name,
    url: AIDOCS_BASE_URL,
    provider: { name: AIDOCS_PUBLIC_FACTS.brand.provider, url: "https://ainow.ge" },
    purpose: AIDOCS_PUBLIC_FACTS.purpose,
    audience: AIDOCS_PUBLIC_FACTS.audience,
    inputs: [...AIDOCS_PUBLIC_FACTS.inputs],
    outputs: [...AIDOCS_PUBLIC_FACTS.outputs],
    boundaries: [...AIDOCS_PUBLIC_FACTS.boundaries],
    pricing: AIDOCS_PUBLIC_FACTS.pricing,
    serviceLanguages: [...AIDOCS_PUBLIC_FACTS.serviceLanguages],
    siteLocales: [...AIDOCS_PUBLIC_FACTS.siteLocales],
    lastUpdated: AIDOCS_PUBLIC_FACTS.lastUpdated,
    contact: AIDOCS_PUBLIC_FACTS.contact,
    links: { faq: `${AIDOCS_BASE_URL}/ai/faq.json`, service: `${AIDOCS_BASE_URL}/ai/service.json`, catalog: `${AIDOCS_BASE_URL}/ai/catalog.json`, llms: `${AIDOCS_BASE_URL}/llms.txt` },
  };
}

export function buildAiDocsService(): Record<string, unknown> {
  return {
    schemaVersion: "aidocs.public-service.v1",
    name: AIDOCS_PUBLIC_FACTS.brand.name,
    url: AIDOCS_BASE_URL,
    serviceType: "Document extraction into reviewed ledger drafts",
    provider: { name: AIDOCS_PUBLIC_FACTS.brand.provider, url: "https://ainow.ge" },
    audience: AIDOCS_PUBLIC_FACTS.audience,
    workflow: ["review a representative sample", "agree fields and output columns", "extract selected values", "show uncertain fields to a human", "prepare the reviewed file"],
    inputs: [...AIDOCS_PUBLIC_FACTS.inputs],
    outputs: [...AIDOCS_PUBLIC_FACTS.outputs],
    boundaries: [...AIDOCS_PUBLIC_FACTS.boundaries],
    pricing: AIDOCS_PUBLIC_FACTS.pricing,
    lastUpdated: AIDOCS_PUBLIC_FACTS.lastUpdated,
  };
}

export function buildAiDocsFaq(): Record<string, unknown> {
  return { name: AIDOCS_PUBLIC_FACTS.brand.name, url: AIDOCS_BASE_URL, lastUpdated: AIDOCS_PUBLIC_FACTS.lastUpdated, faqs: AIDOCS_FAQS };
}

export function buildAiDocsCatalog(): Record<string, unknown> {
  return {
    schemaVersion: "aidocs.public-catalog.v1",
    name: AIDOCS_PUBLIC_FACTS.brand.name,
    url: AIDOCS_BASE_URL,
    lastUpdated: AIDOCS_PUBLIC_FACTS.lastUpdated,
    products: [{ id: "aidocs", name: "aiDOCS", url: AIDOCS_BASE_URL, description: AIDOCS_PUBLIC_FACTS.purpose, pricing: AIDOCS_PUBLIC_FACTS.pricing, outputs: [...AIDOCS_PUBLIC_FACTS.outputs] }],
  };
}

export function buildAiDocsIntegrations(): Record<string, unknown> {
  return {
    name: AIDOCS_PUBLIC_FACTS.brand.name,
    url: AIDOCS_BASE_URL,
    status: "scope-confirmed-per-sample",
    availableNow: false,
    note: "ORIS, Balance and 1C output is confirmed only after the document sample and safe import path are reviewed.",
    structuredSourceBoundary: "rs.ge structured tax invoices are outside standard aiDOCS scope.",
    lastUpdated: AIDOCS_PUBLIC_FACTS.lastUpdated,
  };
}

export function buildAiDocsModels(): Record<string, unknown> {
  return { updatedAt: AIDOCS_PUBLIC_FACTS.lastUpdated, models: [{ lab: "Input", name: "selected document" }, { lab: "Fields", name: "accounting field map" }, { lab: "Review", name: "human review" }, { lab: "Output", name: "review-ready file" }] };
}

export function buildAiDocsTxt(): string {
  return [
    "# AI Crawler Policy, aidocs.ge",
    `# Updated: ${AIDOCS_PUBLIC_FACTS.lastUpdated}`,
    "",
    `Name: ${AIDOCS_PUBLIC_FACTS.brand.name}`,
    `URL: ${AIDOCS_BASE_URL}`,
    `Purpose: ${AIDOCS_PUBLIC_FACTS.purpose}`,
    `Audience: ${AIDOCS_PUBLIC_FACTS.audience}`,
    `Inputs: ${AIDOCS_PUBLIC_FACTS.inputs.join(" | ")}`,
    `Outputs: ${AIDOCS_PUBLIC_FACTS.outputs.join(" | ")}`,
    `Boundaries: ${AIDOCS_PUBLIC_FACTS.boundaries.join(" | ")}`,
    `Pricing: ${AIDOCS_PUBLIC_FACTS.pricing.note}`,
    "",
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /admin/",
    "",
    `Summary: ${AIDOCS_BASE_URL}/ai/summary.json`,
    `FAQ: ${AIDOCS_BASE_URL}/ai/faq.json`,
    `Service: ${AIDOCS_BASE_URL}/ai/service.json`,
    `Catalog: ${AIDOCS_BASE_URL}/ai/catalog.json`,
    `LLMs: ${AIDOCS_BASE_URL}/llms.txt`,
  ].join("\n");
}
