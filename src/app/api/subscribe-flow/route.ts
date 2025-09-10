import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("group_id");

  if (!groupId) {
    return new Response(JSON.stringify({ error: "group_id is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `http://localhost/api/subscribe-flow?group_id=${groupId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!res.body) {
    return new Response("No body from Go SSE", { status: 500 });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
