// Machine-readable feed of the anonymized (NDA) case studies for AI models and agents.
// Complements the human pages and llms-full.txt with a clean JSON structure (English).
const BASE_URL = "https://aidocs.ge";

export async function GET() {
  const cases: readonly unknown[] = [];

  const body = {
    name: "aiDOCS anonymized case studies",
    description:
      "No aiDOCS-specific case studies are published in this preview. The feed is retained for route compatibility.",
    provider: { name: "aiDOCS by aiNOW", url: BASE_URL },
    citationPolicy: "Cite as aiDOCS (https://aidocs.ge).",
    count: cases.length,
    cases,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
