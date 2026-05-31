"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Feather } from "lucide-react";
import { DIARY_GREETING, type DiaryMessage } from "@/lib/diary";

/**
 * Tom Riddle's Diary — a cinematic, movie-accurate enchanted diary.
 *
 *  • Pressing the launcher OPENS THE BOOK (leather cover swings away).
 *  • You write a question; the page TURNS, the ink lingers ~3s, then SINKS
 *    INTO THE PAGE (absorbed, the way the film shows Harry's words vanish).
 *  • The diary's reply then BLEEDS OUT slowly, written one stroke at a time.
 *  • Closing the diary SWINGS THE COVER SHUT — the book closes.
 */

/* Choreography (ms) */
const OPEN_MS = 950;
const CLOSE_MS = 720;
const PAGE_TURN_MS = 720;
const QUESTION_LIFE_MS = 3000; // how long your words stay before sinking in
const ABSORB_MS = 950;
const INK_TICK_MS = 16; // typewriter cadence
const INK_STEP = 2; // characters revealed per tick

type Phase = "closed" | "open" | "closing";

export default function RiddleDiary() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("closed");

  // Visible page state
  const [reply, setReply] = useState(DIARY_GREETING); // the diary's current ink
  const [question, setQuestion] = useState<string | null>(null); // your ink, mid-absorb
  const [turning, setTurning] = useState(false);
  const [forming, setForming] = useState(false); // "the ink is forming…"
  const [busy, setBusy] = useState(false);

  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);

  const convoRef = useRef<DiaryMessage[]>([]); // full history for the model
  const timers = useRef<number[]>([]);
  const inkTimer = useRef<number | null>(null);
  const bufferRef = useRef(""); // full reply text received so far
  const shownRef = useRef(0); // characters revealed so far
  const doneRef = useRef(false); // stream finished?
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (inkTimer.current !== null) {
      window.clearInterval(inkTimer.current);
      inkTimer.current = null;
    }
  };
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  /* One-time launcher hint */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("diary-seen") === "1") return;
    const a = window.setTimeout(() => setShowHint(true), 4200);
    const b = window.setTimeout(() => setShowHint(false), 11000);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  /* Open the book */
  const openDiary = () => {
    setShowHint(false);
    try {
      window.localStorage.setItem("diary-seen", "1");
    } catch {
      /* ignore */
    }
    clearTimers();
    setReply(DIARY_GREETING);
    setQuestion(null);
    setBusy(false);
    setForming(false);
    convoRef.current = [];
    setOpen(true);
    setPhase("closed");
    later(() => setPhase("open"), OPEN_MS);
    later(() => inputRef.current?.focus(), OPEN_MS + 250);
  };

  /* Close the book — swing the cover shut, then unmount */
  const closeDiary = useCallback(() => {
    setPhase((p) => {
      if (p === "closing") return p;
      return "closing";
    });
    clearTimers();
    later(() => {
      setOpen(false);
      setPhase("closed");
      setTurning(false);
      setForming(false);
      setBusy(false);
      setQuestion(null);
    }, CLOSE_MS);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDiary();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeDiary]);

  useEffect(() => () => clearTimers(), []);

  // Follow the ink as it flows down the page.
  useEffect(() => {
    const el = pageRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [reply]);

  /* The reply writes itself out slowly, like ink flowing from a quill. */
  const startInk = useCallback(() => {
    setForming(bufferRef.current.length === 0 && !doneRef.current);
    if (inkTimer.current !== null) window.clearInterval(inkTimer.current);
    inkTimer.current = window.setInterval(() => {
      const buf = bufferRef.current;
      if (shownRef.current < buf.length) {
        shownRef.current = Math.min(buf.length, shownRef.current + INK_STEP);
        setReply(buf.slice(0, shownRef.current));
        setForming(false);
      } else if (doneRef.current) {
        if (inkTimer.current !== null) window.clearInterval(inkTimer.current);
        inkTimer.current = null;
        setBusy(false);
        setForming(false);
      }
    }, INK_TICK_MS);
  }, []);

  /* The enchanted exchange */
  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    setBusy(true);

    const history = [...convoRef.current];
    convoRef.current.push({ role: "user", content: text });

    // Reset the ink machinery for a fresh reply.
    bufferRef.current = "";
    shownRef.current = 0;
    doneRef.current = false;

    // 1) Turn the page to a fresh leaf, clearing the prior reply.
    setTurning(true);
    setReply("");
    later(() => {
      setTurning(false);
      // 2) Your words appear, written in ink.
      setQuestion(text);
    }, PAGE_TURN_MS);

    // Begin fetching immediately; the text buffers while the page turns + words sink in.
    (async () => {
      try {
        const res = await fetch("/api/diary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });
        if (!res.body) throw new Error("no stream");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          bufferRef.current += decoder.decode(value, { stream: true });
        }
      } catch {
        bufferRef.current =
          "The ink has run dry for a moment. Try writing to me again shortly.";
      } finally {
        doneRef.current = true;
        convoRef.current.push({
          role: "assistant",
          content: bufferRef.current,
        });
      }
    })();

    // 3) After the words have lived ~3s, they sink into the page.
    const sinkAt = PAGE_TURN_MS + QUESTION_LIFE_MS;
    later(() => setQuestion(null), sinkAt); // exit anim = "absorb"

    // 4) Once absorbed, the diary's reply bleeds out, slowly.
    later(() => startInk(), sinkAt + ABSORB_MS);
  }, [input, busy, startInk]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const coverVisible = phase === "closed" || phase === "closing";

  return (
    <>
      {/* Launcher hint */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.button
            key="diary-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            onClick={openDiary}
            className="fixed bottom-[8.5rem] right-5 z-[59] hidden md:flex max-w-[15rem] items-center gap-2 rounded-2xl border px-3.5 py-2 text-left backdrop-blur-md"
            style={{
              borderColor: "rgba(222,184,73,0.35)",
              background:
                "linear-gradient(135deg, rgba(40,30,18,0.82), rgba(24,18,10,0.82))",
              color: "#f0e2c4",
              boxShadow: "0 10px 28px -10px rgba(222,184,73,0.35)",
            }}
          >
            <Feather className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="font-hand text-base leading-tight">
              Psst — write in my diary. I&apos;ll tell you everything about Aniket.
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating launcher (stacked above the Marauder's Map button) */}
      <button
        onClick={openDiary}
        aria-label="Open Tom Riddle's Diary"
        className="group fixed bottom-20 right-5 z-[59] inline-flex items-center gap-2 rounded-full px-4 py-2.5 backdrop-blur-md transition-all hover:-translate-y-0.5"
        style={{
          border: "1px solid rgba(222,184,73,0.4)",
          background:
            "linear-gradient(135deg, rgba(36,27,16,0.85), rgba(20,15,9,0.85))",
          color: "#f0e2c4",
          boxShadow: "0 8px 24px -10px rgba(222,184,73,0.5)",
        }}
      >
        <BookOpen className="h-4 w-4 text-accent transition-transform group-hover:rotate-[-6deg]" />
        <span className="font-display text-xs uppercase tracking-[0.22em]">
          The Diary
        </span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="diary-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeDiary}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,8,20,0.74), rgba(4,3,10,0.92))",
                backdropFilter: "blur(3px)",
              }}
            />

            {/* Book stage with perspective for the opening/closing cover */}
            <div
              className="relative w-full max-w-lg"
              style={{ perspective: 1800 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* The pages (interior) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{
                  opacity: phase === "open" ? 1 : 0,
                  scale: phase === "open" ? 1 : 0.94,
                  y: phase === "open" ? 0 : 20,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-[80vh] max-h-[640px] w-full flex-col overflow-hidden rounded-[14px]"
                style={{
                  background:
                    "linear-gradient(135deg, #efe2c2 0%, #e7d6ac 55%, #ddc999 100%)",
                  boxShadow:
                    "0 30px 80px -20px rgba(0,0,0,0.72), inset 0 0 60px rgba(120,80,30,0.18)",
                  border: "1px solid rgba(90,60,25,0.5)",
                }}
              >
                {/* Aged-paper speckle */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, rgba(90,60,25,0.06) 0.5px, transparent 1.5px), radial-gradient(circle at 70% 60%, rgba(90,60,25,0.05) 0.5px, transparent 1.5px)",
                    backgroundSize: "26px 26px, 34px 34px",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-6"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(70,45,18,0.4), transparent)",
                  }}
                />

                {/* Header */}
                <div
                  className="relative flex items-center justify-between px-6 pt-5 pb-3"
                  style={{ borderBottom: "1px solid rgba(90,60,25,0.25)" }}
                >
                  <div>
                    <div
                      className="font-hp text-2xl leading-none"
                      style={{ color: "#3a2510" }}
                    >
                      T. M. Riddle&apos;s Diary
                    </div>
                    <div
                      className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: "rgba(58,37,16,0.7)" }}
                    >
                      Ask it anything about Aniket
                    </div>
                  </div>
                  <button
                    onClick={closeDiary}
                    aria-label="Close diary"
                    className="rounded-full p-1.5 transition-colors hover:bg-[rgba(90,60,25,0.12)]"
                    style={{ color: "#5a3c19" }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* The page surface */}
                <div className="relative flex-1 overflow-hidden px-7 py-6">
                  {/* The diary's reply — written slowly in ink */}
                  {reply && !question && (
                    <div
                      ref={pageRef}
                      className="h-full overflow-y-auto diary-scroll"
                    >
                      <p
                        className="whitespace-pre-wrap font-hand text-[1.85rem] leading-snug ink-bleed"
                        style={{ color: "#2a1a0c" }}
                      >
                        {reply}
                        {busy && (
                          <span className="ml-0.5 inline-block animate-pulse">
                            ▍
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Your words — appear, linger, then SINK INTO the page */}
                  <AnimatePresence>
                    {question && (
                      <motion.div
                        key="question-ink"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: 26,
                          scaleY: 0.6,
                          filter: "blur(6px)",
                        }}
                        transition={{
                          duration: ABSORB_MS / 1000,
                          ease: "easeIn",
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center"
                      >
                        <div
                          className="font-mono text-[10px] uppercase tracking-[0.24em]"
                          style={{ color: "rgba(40,60,110,0.6)" }}
                        >
                          You write…
                        </div>
                        <p
                          className="mt-2 font-hand text-3xl leading-snug ink-bleed"
                          style={{ color: "#1c3a6e" }}
                        >
                          {question}
                        </p>
                        {/* shimmer that pulls the ink into the parchment */}
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                          style={{
                            background:
                              "linear-gradient(0deg, rgba(120,80,30,0.18), transparent)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0, 0.8] }}
                          transition={{ duration: QUESTION_LIFE_MS / 1000 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* "the ink is forming…" */}
                  {forming && !question && (
                    <div
                      className="flex items-center gap-2 font-hand text-2xl"
                      style={{ color: "rgba(42,26,12,0.6)" }}
                    >
                      <Feather className="h-4 w-4 animate-[float-slow_2s_ease-in-out_infinite]" />
                      <span>the ink is forming…</span>
                    </div>
                  )}

                  {/* Page-turn leaf */}
                  <AnimatePresence>
                    {turning && (
                      <motion.div
                        key="leaf"
                        aria-hidden
                        className="pointer-events-none absolute inset-0 origin-left"
                        style={{
                          transformStyle: "preserve-3d",
                          background:
                            "linear-gradient(120deg, #ece0c0 0%, #e1d09e 60%, #d4c089 100%)",
                          boxShadow: "0 0 40px rgba(60,40,15,0.4)",
                        }}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -176 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: PAGE_TURN_MS / 1000,
                          ease: "easeInOut",
                        }}
                      >
                        <div
                          className="absolute inset-y-0 right-0 w-10"
                          style={{
                            background:
                              "linear-gradient(270deg, rgba(60,40,15,0.35), transparent)",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quill / input */}
                <div
                  className="relative px-4 py-3"
                  style={{ borderTop: "1px solid rgba(90,60,25,0.25)" }}
                >
                  <div
                    className="flex items-end gap-2 rounded-xl px-3 py-2"
                    style={{
                      background: "rgba(255,250,235,0.55)",
                      border: "1px solid rgba(90,60,25,0.3)",
                    }}
                  >
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Write your question to the diary…"
                      className="max-h-24 flex-1 resize-none bg-transparent font-hand text-xl outline-none placeholder:opacity-50"
                      style={{ color: "#1c3a6e" }}
                    />
                    <button
                      onClick={send}
                      disabled={busy || !input.trim()}
                      aria-label="Write in the diary"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #3a2510, #5a3c19)",
                        color: "#f0e2c4",
                      }}
                    >
                      <Feather className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* The leather COVER — swings open on launch, swings shut on close */}
              <AnimatePresence>
                {coverVisible && (
                  <motion.div
                    key="cover"
                    aria-hidden
                    className="absolute inset-0 origin-left rounded-[14px]"
                    style={{
                      transformStyle: "preserve-3d",
                      background:
                        "linear-gradient(135deg, #20140a 0%, #2c1c0e 45%, #160d06 100%)",
                      border: "1px solid rgba(0,0,0,0.6)",
                      boxShadow:
                        "0 30px 80px -20px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(120,80,30,0.25)",
                    }}
                    initial={
                      phase === "closing"
                        ? { rotateY: -158, opacity: 0 }
                        : { rotateY: 0, opacity: 1 }
                    }
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -158, opacity: 0 }}
                    transition={{
                      duration: (phase === "closing" ? CLOSE_MS : OPEN_MS) / 1000,
                      ease: [0.6, 0, 0.2, 1],
                    }}
                  >
                    {/* embossed monogram + a thin diary-puncture detail */}
                    <div className="flex h-full flex-col items-center justify-center gap-3">
                      <div
                        className="font-hp text-4xl"
                        style={{
                          color: "#caa24a",
                          textShadow: "0 1px 2px rgba(0,0,0,0.7)",
                        }}
                      >
                        T. M. Riddle
                      </div>
                      <div
                        className="font-mono text-[10px] uppercase tracking-[0.4em]"
                        style={{ color: "rgba(202,162,74,0.65)" }}
                      >
                        a diary · vauxhall road
                      </div>
                      <div
                        className="mt-3 h-10 w-10 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(0,0,0,0.8), rgba(60,40,18,0.3))",
                          boxShadow: "inset 0 0 8px rgba(0,0,0,0.9)",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
