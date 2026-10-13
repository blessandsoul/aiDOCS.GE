import { buildAiDocsModels } from "@/lib/aidocs-public-facts";

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  return Response.json(buildAiDocsModels(), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
