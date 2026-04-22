"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Radio,
  Lightbulb,
  Cog,
  Network,
  GraduationCap,
  Rocket,
  Image as ImageIcon,
  Clapperboard,
  FileText,
  Film,
  Mic,
  Wand2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────── */
/*  CHAPTERS — edit copy here; structure drives the whole timeline  */
/* ─────────────────────────────────────────────────────────────── */

type Deliverable = {
  label: string;
  kind: "video" | "static" | "script" | "audio" | "system";
};

type GifSpec = {
  caption: string;
  tilt: number; // degrees
  emoji: string;
};

type Chapter = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  pullQuote?: string;
  accent: string; // hex — used in gradients & chips
  accent2: string; // second hex
  bg: string; // page background
  Icon: typeof Sparkles;
  gif?: GifSpec;
  deliverables?: Deliverable[];
  stat?: { value: string; label: string };
};

const chapters: Chapter[] = [
  {
    id: "cover",
    kicker: "A Pearmill team love letter",
    title: "From Silos\nto Ecosystem",
    body: "What Better.com taught us about pitching as one story instead of four silos. Not a case study — a team love letter with learnings baked in.",
    pullQuote:
      "Audits, pre-Better, were kind of disconnected and post-Better, we're being really intentional about working as one ecosystem, rather than separate silos. — Coke, 4/21",
    accent: "#fb7185",
    accent2: "#fbbf24",
    bg: "#fff7ed",
    Icon: Sparkles,
    gif: { caption: "the thesis", tilt: -4, emoji: "✨" },
  },
  {
    id: "evolution",
    kicker: "Part 1 · The Evolution",
    title: "Nokia\nRFP\nBetsy",
    body: "Nokia: we pitched ourselves — too hard. First Better RFP: we chased a bulletproof deliverable instead of a clear one. By Betsy, everyone was over performing — so we gave them what they needed, not what they asked for. Explain → seek perfection → show.",
    pullQuote:
      "Clients come in saying 'media only,' but we know that Creative is what drives our engine. So instead of waiting for them to change their minds, we've started going in with the confidence that we can change it for them. — Coke, 4/21",
    accent: "#f472b6",
    accent2: "#c084fc",
    bg: "#fdf2f8",
    Icon: Layers,
    gif: { caption: "explain → seek → show", tilt: 3, emoji: "🪞" },
    deliverables: [
      { label: "Nokia deck", kind: "static" },
      { label: "Better RFP v1", kind: "script" },
      { label: "Betsy PPT", kind: "static" },
    ],
  },
  {
    id: "principles",
    kicker: "Part 2 · The Principles",
    title: "Three\ncommandments",
    body: "One story, many voices — channels ladder to a single thesis, not four decks. Three-track creative — maintenance, rate-sensitive, strategy-tied — sized to business urgency, not calendar cycles. Stability is strategy — the first 30 days of any takeover are maintenance-only. Safe hands first. Smart later.",
    pullQuote: "Fix the foundation to enable scale. Maintain performance.",
    accent: "#a78bfa",
    accent2: "#f472b6",
    bg: "#faf5ff",
    Icon: Lightbulb,
    gif: { caption: "the commandments", tilt: 4, emoji: "📜" },
    deliverables: [
      { label: "One kickoff doc", kind: "system" },
      { label: "Three-track creative", kind: "system" },
      { label: "30-day stability plan", kind: "system" },
    ],
  },
  {
    id: "audit-rfp",
    kicker: "Ch. 01–02 · Oct–Nov 2025",
    title: "The audit\nbecomes\nan RFP",
    body: "October: remote Notion audit. We hooked them with knowledge. Jessica wanted a deeper dive — it turned into a full RFP. November: Moojan built the deck with tonsillitis. Mariate wrote Meta over a weekend. Cosmin shipped three LP variations. Masha, Egor, Coke, Valerie rallied us through.",
    pullQuote: "If we don't win this, f-them! — Valerie",
    accent: "#38bdf8",
    accent2: "#6366f1",
    bg: "#eff6ff",
    Icon: Radio,
    stat: { value: "3", label: "LP variations in one weekend" },
    gif: { caption: "RFP incoming", tilt: -5, emoji: "📬" },
    deliverables: [
      { label: "Round 1 deck", kind: "static" },
      { label: "Meta plan", kind: "script" },
      { label: "3× LP variations", kind: "static" },
      { label: "RFP response", kind: "script" },
    ],
  },
  {
    id: "comp-betsy",
    kicker: "Ch. 03–04 · Dec 2025 – Feb 2026",
    title: "The second\nask is\na gift",
    body: "Het reframed Google as a rank/quality problem, not a budget one. Mariate + Donovan + Dino rebuilt social as performance. Cos audited LPs. Then Betsy: direct submission, no face time, PowerPoint only — everything had to land on the page. They had no notes.",
    pullQuote:
      "In powerpoint no less, which we all know our preferred outlet [sic]. — Coke on Betsy",
    accent: "#34d399",
    accent2: "#22d3ee",
    bg: "#ecfdf5",
    Icon: Cog,
    stat: { value: "0", label: "notes from Betsy" },
    gif: { caption: "the gift", tilt: -3, emoji: "🎁" },
    deliverables: [
      { label: "Competitive analysis", kind: "system" },
      { label: "Google scaling model", kind: "system" },
      { label: "LP audit", kind: "system" },
      { label: "Betsy PPT", kind: "static" },
    ],
  },
  {
    id: "kickoff",
    kicker: "Ch. 05–06 · Mar–Apr 2026",
    title: "Jump450,\nthe book,\nthe laptop kiss",
    body: "March: Sly called — we'd dropped to #2. Jump450 offered 3 months free + 4.5% Y1. Nima countered with a sliding-scale deal tied to spend trajectory. Then quietly planted a book for Sly at Better's office — no note, no fanfare. April 20 NYC: no real kickoff, so we made the strategy conversation the kickoff.",
    pullQuote:
      "Jessica kissed her laptop when she saw Haley's dashboard. — Nima",
    accent: "#fb923c",
    accent2: "#f43f5e",
    bg: "#fff7ed",
    Icon: Network,
    stat: { value: "$1.5M", label: "incremental secured that day · $1M in May" },
    gif: { caption: "the laptop kiss", tilt: 2, emoji: "💋" },
    deliverables: [
      { label: "Creative strategy dashboard", kind: "system" },
      { label: "Meta plan v3", kind: "script" },
      { label: "Google scaling model", kind: "system" },
      { label: "The book (for Sly)", kind: "static" },
    ],
  },
  {
    id: "plot-twist",
    kicker: "Part 4 · The Honest Plot Twist",
    title: "We won\ndespite\nthe format",
    body: "Jessica never read the RFP — she hates Notion. Sly bounced off the collapsed toggles too, came back late one night. But every time Jessica asked him which agency did X best, his answer was the same: Pearmill.",
    pullQuote: "Your RFP response cooked every other agency. — Sly",
    accent: "#f59e0b",
    accent2: "#10b981",
    bg: "#fefce8",
    Icon: GraduationCap,
    gif: { caption: "cooked", tilt: -2, emoji: "🍳" },
    stat: { value: "1", label: "champion in the room (Josh)" },
  },
  {
    id: "onwards",
    kicker: "Closer",
    title: "Better(.com)\nthan we were\nthe last time",
    body: "Audits integrated from day one. One doc, not many. Three-track as default. Stability framed as strategy. Format fits audience — at a glance AND with depth. Show, don't tell. Plant the book. Listen past what they said, hear what's at the heart of it.",
    pullQuote:
      "We haven't perfected our craft yet, and that's largely because we never will. We test, we learn, we iterate. That's what makes us us. — Coke",
    accent: "#ec4899",
    accent2: "#8b5cf6",
    bg: "#fdf4ff",
    Icon: Rocket,
    gif: { caption: "mic drop", tilt: 5, emoji: "🎤" },
  },
];

/* ─────────────────────────────────────────────────────────────── */
/*  Helpers                                                          */
/* ─────────────────────────────────────────────────────────────── */

// Smooth open/close curve: 0 → 1 → 0 as p moves -1 → 0 → 1.
// Opens before the center, closes after.
function openness(p: number, openStart = -0.9, openEnd = -0.15, closeStart = 0.25, closeEnd = 0.85) {
  const open = clamp01((p - openStart) / (openEnd - openStart));
  const close = 1 - clamp01((p - closeStart) / (closeEnd - closeStart));
  return Math.min(open, close);
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─────────────────────────────────────────────────────────────── */
/*  Main component                                                   */
/* ─────────────────────────────────────────────────────────────── */

export function EcosystemTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReducedMotion(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const wrap = wrapperRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const current = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? current / total : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const n = chapters.length;
  const activeIndex = Math.min(n - 1, Math.round(progress * (n - 1)));
  const activeChapter = chapters[activeIndex];
  // Track moves from 0 → -(n-1)*100vw as progress goes 0 → 1
  const translatePct = -progress * (n - 1) * 100;

  if (reducedMotion) {
    return <ReducedStack />;
  }

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${n * 100}vh` }}
      className="relative"
      aria-label="Horizontal timeline: From Silos to Ecosystem"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden transition-[background-color] duration-700 ease-out"
        style={{ backgroundColor: activeChapter.bg }}
      >
        <ParallaxBackdrop progress={progress} chapter={activeChapter} />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-700 font-semibold">
              Pearmill × Better
            </div>
          </div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 pointer-events-auto">
            Scroll ↓ · timeline →
          </div>
        </div>

        {/* Horizontal track */}
        <div
          className="flex h-full"
          style={{
            width: `${n * 100}vw`,
            transform: `translate3d(${translatePct}vw, 0, 0)`,
            willChange: "transform",
          }}
        >
          {chapters.map((ch, i) => {
            const center = i / Math.max(n - 1, 1);
            const span = 1 / Math.max(n - 1, 1);
            const local = clamp(-1, 1, (progress - center) / span);
            return <ChapterPanel key={ch.id} chapter={ch} index={i} local={local} />;
          })}
        </div>

        <ProgressRail progress={progress} activeIndex={activeIndex} />
        <ScrollHint hide={progress > 0.02} />
      </div>
    </div>
  );
}

function clamp(min: number, max: number, v: number) {
  return Math.max(min, Math.min(max, v));
}

/* ─────────────────────────────────────────────────────────────── */
/*  Parallax backdrop — slow shapes drifting behind the track         */
/* ─────────────────────────────────────────────────────────────── */

function ParallaxBackdrop({ progress, chapter }: { progress: number; chapter: Chapter }) {
  const p = progress;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Big slow blob */}
      <div
        className="absolute rounded-full blur-3xl opacity-50 transition-colors duration-700"
        style={{
          width: "60vw",
          height: "60vw",
          top: `${20 - p * 10}%`,
          left: `${-20 + p * 30}%`,
          background: `radial-gradient(circle, ${chapter.accent}40, transparent 60%)`,
          transform: `translate3d(${-p * 300}px, ${p * 80}px, 0)`,
        }}
      />
      {/* Medium medium blob */}
      <div
        className="absolute rounded-full blur-3xl opacity-40 transition-colors duration-700"
        style={{
          width: "40vw",
          height: "40vw",
          bottom: `${10 - p * 20}%`,
          right: `${-10 + p * 20}%`,
          background: `radial-gradient(circle, ${chapter.accent2}55, transparent 60%)`,
          transform: `translate3d(${p * 500}px, ${-p * 60}px, 0)`,
        }}
      />
      {/* Dotted grid drifting faster */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          transform: `translate3d(${-p * 600}px, 0, 0)`,
        }}
      />
      {/* Floating emojis */}
      <FloatingEmoji p={p} speed={800} x={15} y={70} emoji="✦" delay={0} />
      <FloatingEmoji p={p} speed={1200} x={85} y={20} emoji="✧" delay={0.2} />
      <FloatingEmoji p={p} speed={600} x={50} y={85} emoji="◌" delay={0.4} />
      <FloatingEmoji p={p} speed={900} x={70} y={55} emoji="·" delay={0.6} />
    </div>
  );
}

function FloatingEmoji({
  p,
  speed,
  x,
  y,
  emoji,
  delay,
}: {
  p: number;
  speed: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
}) {
  return (
    <span
      className="absolute text-2xl select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate3d(${-p * speed}px, ${Math.sin((p + delay) * Math.PI * 2) * 20}px, 0)`,
        opacity: 0.35,
      }}
    >
      {emoji}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Chapter panel                                                   */
/* ─────────────────────────────────────────────────────────────── */

function ChapterPanel({
  chapter,
  index,
  local,
}: {
  chapter: Chapter;
  index: number;
  local: number; // -1 (off right) → 0 (center) → 1 (off left)
}) {
  const isCover = index === 0;
  const isOutro = chapter.id === "onwards";

  // Element-level openness (builds open, then closes)
  const oKicker = openness(local, -0.95, -0.35, 0.4, 0.95);
  const oTitle = openness(local, -0.85, -0.25, 0.35, 0.9);
  const oBody = openness(local, -0.7, -0.1, 0.3, 0.85);
  const oExtras = openness(local, -0.55, 0.05, 0.25, 0.8);

  // Parallax offsets relative to local (in px)
  const parallaxTitle = local * -60;
  const parallaxBody = local * -40;
  const parallaxGif = local * 100;
  const parallaxDeliv = local * -100;

  const { Icon } = chapter;

  return (
    <section
      className="relative flex-shrink-0 h-full w-screen flex items-center justify-center px-8 md:px-16"
      style={{ width: "100vw" }}
      aria-label={chapter.title.replace(/\n/g, " ")}
    >
      {/* Chapter side label — small vertical number */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium"
        style={{
          writingMode: "vertical-rl",
          transform: `translate(${local * -30}px, -50%) rotate(180deg)`,
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
      </div>

      <div
        className={`relative z-10 grid gap-10 items-center w-full max-w-6xl ${
          isCover || isOutro ? "grid-cols-1 text-center justify-items-center" : "grid-cols-1 md:grid-cols-[1.1fr_1fr]"
        }`}
      >
        {/* Text column */}
        <div className={isCover || isOutro ? "flex flex-col items-center" : ""}>
          {/* Kicker chip */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] mb-6 shadow-sm"
            style={{
              opacity: oKicker,
              transform: `translate3d(0, ${(1 - oKicker) * 20}px, 0)`,
              background: `linear-gradient(135deg, ${chapter.accent}22, ${chapter.accent2}22)`,
              color: chapter.accent,
              border: `1px solid ${chapter.accent}33`,
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {chapter.kicker}
          </div>

          {/* Title */}
          <h2
            className={`font-semibold leading-[0.95] tracking-tight text-zinc-900 whitespace-pre-line ${
              isCover ? "text-[clamp(3rem,9vw,8rem)]" : "text-[clamp(2.25rem,6vw,5.5rem)]"
            }`}
            style={{
              opacity: oTitle,
              transform: `translate3d(${parallaxTitle}px, ${(1 - oTitle) * 40}px, 0)`,
            }}
          >
            {chapter.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Accent underline */}
          <div
            className="h-1.5 rounded-full my-6"
            style={{
              width: `${lerp(0, 120, oTitle)}px`,
              background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accent2})`,
              opacity: oTitle,
            }}
          />

          {/* Body */}
          <p
            className={`text-zinc-700 text-lg md:text-xl leading-relaxed max-w-xl ${isCover || isOutro ? "mx-auto" : ""}`}
            style={{
              opacity: oBody,
              transform: `translate3d(${parallaxBody}px, ${(1 - oBody) * 30}px, 0)`,
            }}
          >
            {chapter.body}
          </p>

          {/* Pull quote */}
          {chapter.pullQuote && (
            <blockquote
              className="mt-6 pl-4 border-l-4 italic text-zinc-800 text-lg max-w-xl"
              style={{
                borderColor: chapter.accent,
                opacity: oExtras,
                transform: `translate3d(${parallaxBody * 0.5}px, ${(1 - oExtras) * 20}px, 0)`,
              }}
            >
              “{chapter.pullQuote}”
            </blockquote>
          )}

          {/* Stat */}
          {chapter.stat && (
            <div
              className="mt-6 inline-flex items-baseline gap-3 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur shadow-sm border border-white"
              style={{
                opacity: oExtras,
                transform: `translate3d(0, ${(1 - oExtras) * 20}px, 0)`,
              }}
            >
              <span
                className="text-4xl font-bold tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {chapter.stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-zinc-600">{chapter.stat.label}</span>
            </div>
          )}

          {/* Mic-drop tag for the outro */}
          {isOutro && (
            <div
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg"
              style={{
                opacity: oExtras,
                background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent2})`,
                transform: `translate3d(0, ${(1 - oExtras) * 20}px, 0)`,
              }}
            >
              onwards <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Media column */}
        {!isCover && !isOutro && (
          <div className="relative flex flex-col items-center gap-6">
            {chapter.gif && (
              <GifPlaceholder
                gif={chapter.gif}
                accent={chapter.accent}
                accent2={chapter.accent2}
                openness={oExtras}
                offsetX={parallaxGif}
              />
            )}
            {chapter.deliverables && (
              <DeliverableStack
                items={chapter.deliverables}
                accent={chapter.accent}
                accent2={chapter.accent2}
                openness={oExtras}
                offsetX={parallaxDeliv}
              />
            )}
          </div>
        )}

        {/* Cover gets a hero gif centered */}
        {isCover && chapter.gif && (
          <div className="mt-4">
            <GifPlaceholder
              gif={chapter.gif}
              accent={chapter.accent}
              accent2={chapter.accent2}
              openness={oExtras}
              offsetX={parallaxGif}
              size="lg"
            />
          </div>
        )}

        {/* Outro gets a cute sprouting placeholder */}
        {isOutro && chapter.gif && (
          <div className="mt-4">
            <GifPlaceholder
              gif={chapter.gif}
              accent={chapter.accent}
              accent2={chapter.accent2}
              openness={oExtras}
              offsetX={parallaxGif}
              size="md"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  GIF placeholder — animated, drop a real GIF on top via src       */
/* ─────────────────────────────────────────────────────────────── */

function GifPlaceholder({
  gif,
  accent,
  accent2,
  openness,
  offsetX,
  size = "md",
}: {
  gif: GifSpec;
  accent: string;
  accent2: string;
  openness: number;
  offsetX: number;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "lg" ? "w-[28rem] h-[17rem]" : size === "sm" ? "w-56 h-36" : "w-80 h-52";
  return (
    <div
      className={`relative ${dims} rounded-3xl overflow-hidden shadow-xl`}
      style={{
        opacity: openness,
        transform: `translate3d(${offsetX}px, ${(1 - openness) * 30}px, 0) rotate(${gif.tilt}deg) scale(${lerp(0.94, 1, openness)})`,
        background: `linear-gradient(135deg, ${accent}33, ${accent2}33)`,
        border: "1px solid rgba(255,255,255,0.6)",
      }}
    >
      {/* Drop a real <img src="/gifs/foo.gif" /> in place of this block */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="ecosystem-wobble text-7xl select-none">{gif.emoji}</div>
      </div>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `repeating-linear-gradient(45deg, ${accent}11 0 8px, transparent 8px 16px)`,
        }}
      />
      {/* Corner tag */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur text-[10px] uppercase tracking-[0.18em] font-semibold text-zinc-700 flex items-center gap-1">
        <Film className="w-3 h-3" /> GIF · {gif.caption}
      </div>
      {/* Scan line sweep */}
      <div className="ecosystem-sweep absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* Playhead dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/80 ecosystem-blink"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Deliverable stack — creative outputs for each chapter            */
/* ─────────────────────────────────────────────────────────────── */

function DeliverableStack({
  items,
  accent,
  accent2,
  openness,
  offsetX,
}: {
  items: Deliverable[];
  accent: string;
  accent2: string;
  openness: number;
  offsetX: number;
}) {
  return (
    <div className="w-full max-w-md">
      <div
        className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3 flex items-center gap-2"
        style={{ opacity: openness }}
      >
        <Wand2 className="w-3 h-3" />
        Deliverables
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((d, i) => {
          const localOpen = clamp01((openness - i * 0.08) * 1.25);
          return (
            <div
              key={d.label}
              className="px-3 py-2 rounded-xl bg-white/80 backdrop-blur shadow-sm border border-white flex items-center gap-2 text-sm text-zinc-700"
              style={{
                opacity: localOpen,
                transform: `translate3d(${offsetX * (1 - i * 0.1)}px, ${(1 - localOpen) * 16}px, 0)`,
              }}
            >
              <DeliverableIcon kind={d.kind} accent={accent} accent2={accent2} />
              <span className="font-medium">{d.label}</span>
              <span
                className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                style={{
                  color: accent,
                  background: `${accent}15`,
                }}
              >
                {d.kind}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeliverableIcon({ kind, accent, accent2 }: { kind: Deliverable["kind"]; accent: string; accent2: string }) {
  const cls = "w-4 h-4";
  const style = { color: accent };
  switch (kind) {
    case "video":
      return <Clapperboard className={cls} style={style} />;
    case "static":
      return <ImageIcon className={cls} style={style} />;
    case "script":
      return <FileText className={cls} style={style} />;
    case "audio":
      return <Mic className={cls} style={style} />;
    case "system":
    default:
      return (
        <span
          className="w-4 h-4 rounded flex items-center justify-center text-white text-[9px] font-bold"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}
        >
          ◉
        </span>
      );
  }
}

/* ─────────────────────────────────────────────────────────────── */
/*  Progress rail — chapter dots + animated fill                     */
/* ─────────────────────────────────────────────────────────────── */

function ProgressRail({ progress, activeIndex }: { progress: number; activeIndex: number }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-white/70 backdrop-blur px-4 py-2.5 rounded-full shadow-md border border-white">
      <div className="relative h-1.5 w-48 rounded-full bg-zinc-200 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #f472b6, #a78bfa, #38bdf8, #34d399, #fb923c)",
          }}
        />
      </div>
      <div className="flex items-center gap-1.5">
        {chapters.map((c, i) => (
          <span
            key={c.id}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-5 bg-zinc-900" : "bg-zinc-300"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono tabular-nums text-zinc-600">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ScrollHint({ hide }: { hide: boolean }) {
  return (
    <div
      className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-xs text-zinc-500 transition-opacity duration-500 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="ecosystem-bounce">↓</span>
      <span className="uppercase tracking-[0.2em]">scroll to begin</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Reduced-motion fallback — vertical stack, no parallax            */
/* ─────────────────────────────────────────────────────────────── */

function ReducedStack() {
  return (
    <div className="min-h-screen bg-[#fff7ed]">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {chapters.map((ch, i) => (
          <section key={ch.id} className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
              style={{ background: `${ch.accent}22`, color: ch.accent }}
            >
              {ch.kicker}
            </div>
            <h2 className="text-4xl font-semibold leading-tight whitespace-pre-line">
              {ch.title}
            </h2>
            <p className="text-lg text-zinc-700 leading-relaxed">{ch.body}</p>
            {ch.pullQuote && (
              <blockquote
                className="pl-4 border-l-4 italic text-zinc-800"
                style={{ borderColor: ch.accent }}
              >
                “{ch.pullQuote}”
              </blockquote>
            )}
            {i < chapters.length - 1 && <hr className="border-zinc-200 mt-10" />}
          </section>
        ))}
      </div>
    </div>
  );
}
