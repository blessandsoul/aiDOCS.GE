import { buildAiDocsIntegrations } from "@/lib/aidocs-public-facts";

export const revalidate = 86400;

export function GET(): Response {
  return Response.json(
    buildAiDocsIntegrations(),
    {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    },
  );
}
