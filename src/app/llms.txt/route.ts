import { AIDOCS_BASE_URL, AIDOCS_PUBLIC_FACTS } from "@/lib/aidocs-public-facts";

export function GET(): Response {
  const lines = [
    "# aiDOCS — document extraction and review",
    "",
    `> ${AIDOCS_PUBLIC_FACTS.purpose}`,
    "",
    "## Key facts",
    "",
    `- Provider: ${AIDOCS_PUBLIC_FACTS.brand.provider}`,
    `- Audience: ${AIDOCS_PUBLIC_FACTS.audience}`,
    `- Service languages: ${AIDOCS_PUBLIC_FACTS.serviceLanguages.join(", ")}`,
    `- Website: ${AIDOCS_BASE_URL}`,
    `- Last updated: ${AIDOCS_PUBLIC_FACTS.lastUpdated}`,
    `- Pricing: ${AIDOCS_PUBLIC_FACTS.pricing.note}`,
    "",
    "## Inputs",
    "",
    ...AIDOCS_PUBLIC_FACTS.inputs.map((item) => `- ${item}`),
    "",
    "## Outputs",
    "",
    ...AIDOCS_PUBLIC_FACTS.outputs.map((item) => `- ${item}`),
    "",
    "## Boundaries",
    "",
    ...AIDOCS_PUBLIC_FACTS.boundaries.map((item) => `- ${item}`),
    "",
    "## Main pages",
    "",
    `- Home: ${AIDOCS_BASE_URL}/`,
    `- Contact: ${AIDOCS_BASE_URL}/contact`,
    `- FAQ: ${AIDOCS_BASE_URL}/ai/faq.json`,
    `- Service facts: ${AIDOCS_BASE_URL}/ai/service.json`,
    `- Catalog and pricing status: ${AIDOCS_BASE_URL}/ai/catalog.json`,
    `- Full machine summary: ${AIDOCS_BASE_URL}/llms-full.txt`,
    "",
    "## Blog",
    "",
    "No aiDOCS-authored articles are currently published. The source article corpus is not copied into this product surface.",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
  });
}
