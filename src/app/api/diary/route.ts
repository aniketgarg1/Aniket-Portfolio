/**
 * POST /api/diary — the enchanted diary's reply endpoint.
 *
 * Streams Tom Riddle-style replies about Aniket via Claude (with the static
 * bio prompt-cached). If no ANTHROPIC_API_KEY is configured, it falls back to
 * a keyword-matched scripted reply, streamed character-by-character so the UI
 * behaves identically either way.
 */

import Anthropic from "@anthropic-ai/sdk";
import {
  SYSTEM_PROMPT,
  DIARY_MODEL,
  MAX_MESSAGE_CHARS,
  MAX_HISTORY_TURNS,
  MAX_OUTPUT_TOKENS,
  scriptedReply,
  type DiaryMessage,
} from "@/lib/diary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* --- crude per-IP rate limiting (best-effort; resets per serverless instance) --- */
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQ_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "anon";
}

/** Stream a plain string to the client as UTF-8 chunks (used by the fallback). */
function streamString(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Emit in small chunks so the ink "writes out" rather than appearing at once.
      const words = text.split(/(\s+)/);
      for (const w of words) {
        controller.enqueue(encoder.encode(w));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return streamString(
      "Patience — you write faster than I can pen my replies. Give me a moment, then ask again.",
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return new Response("Empty message", { status: 400 });
  if (message.length > MAX_MESSAGE_CHARS) {
    return streamString("That is a great deal of ink at once. Ask me something shorter.");
  }

  // Sanitize + bound the conversation history coming from the client.
  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history: DiaryMessage[] = rawHistory
    .filter(
      (m): m is DiaryMessage =>
        !!m &&
        typeof (m as DiaryMessage).content === "string" &&
        ((m as DiaryMessage).role === "user" || (m as DiaryMessage).role === "assistant"),
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

  // No API key (or an empty/whitespace one) → scripted fallback, still streamed.
  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    return streamString(scriptedReply(message));
  }

  const client = new Anthropic();

  try {
    const stream = client.messages.stream({
      model: DIARY_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      // Static bio prompt — cached so repeat visitors don't re-pay for it.
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      ],
      messages: [...history, { role: "user", content: message }],
    });

    const encoder = new TextEncoder();
    const out = new ReadableStream({
      async start(controller) {
        try {
          stream.on("text", (delta) => controller.enqueue(encoder.encode(delta)));
          await stream.finalMessage();
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              "The ink has run dry for a moment. Try writing to me again shortly.",
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(out, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    // Any setup error (auth, network) → degrade gracefully to the scripted voice.
    console.error("[diary] stream setup threw:", err);
    return streamString(scriptedReply(message));
  }
}
