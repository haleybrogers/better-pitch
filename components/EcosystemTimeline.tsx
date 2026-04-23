"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  src?: string; // optional real media url (image, gif, or mp4/mov video)
  asPhoto?: boolean; // when true, render the full image without GIF chrome
  scrollPages?: string[]; // when set, renders an infinite vertical scroll of these image paths
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
  gallery?: string[]; // cute moments — selfies, team photos, real artifacts
  creativeGallery?: string[]; // the creative work we shipped for this round
};

const notionPages = Array.from(
  { length: 50 },
  (_, i) => `/moments/notion-pages/page-${String(i + 1).padStart(2, "0")}.jpg`
);

const chapters: Chapter[] = [
  {
    id: "cover",
    kicker: "Pearmill × Better",
    title: "Strap in.",
    body: "This is the story of one pitch — and how it fucking changed the way we think about everything. Seven months. 90% → 75% → 50% → 90% → 95!! → 30% → 95. The odds swung every hour. Here's the ride.",
    pullQuote:
      "We're being really intentional about working as one ecosystem, rather than separate silos. — Coke",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Sparkles,
    gif: {
      caption: "strap in",
      tilt: -4,
      emoji: "🎢",
      src: "https://media.giphy.com/media/gHfdhl5JCAySFfkgTy/giphy.gif",
    },
  },
  {
    id: "round-1",
    kicker: "Round 1 · Oct 2025 · the old way",
    title: "We got in\nthe door.",
    body: "We hooked them with our channel expertise. But they wanted more evidence of our understanding of the competitive landscape. So we sent an audit. An infinite, siloed Notion doc. The old way.",
    pullQuote:
      "We really hooked them with our knowledge. — Donovan, recalling the first call",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#fafaf9",
    Icon: Radio,
    gif: {
      caption: "the infinite notion doc",
      tilt: 0,
      emoji: "📄",
      src: "/moments/notion-scroll.mov",
      asPhoto: true,
    },
  },
  {
    id: "round-2",
    kicker: "Round 2 · Nov 18 2025 · NYC",
    title: "We brought\na cake.",
    body: "We unified the message — creative, media, and measurement tied together as a single thread. But the client mis-represented the brief. And we overshot the moon with creative. Then Jessica didn't read the RFP, because it was in Notion.",
    pullQuote:
      "Your RFP response cooked every other agency. — Sly, very late one night",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Lightbulb,
    gif: {
      caption: "the actual cake",
      tilt: 0,
      emoji: "🎂",
      src: "/moments/cake.jpg",
      asPhoto: true,
    },
    gallery: [
      "/moments/nyc-team.jpg",
      "/moments/nyc-walk-1.mov",
      "/moments/nyc-walk-2.mov",
      "/moments/nyc-walk-3.mov",
    ],
    creativeGallery: [
      "/moments/statics/cake-creative.png",
      "/moments/statics/melanoma.png",
      "/moments/statics/cortisol-shirt.png",
      "/moments/statics/mansplaining.png",
      "/moments/statics/hotel-key.png",
      "/moments/statics/coffee-cup.png",
      "/moments/statics/apple-watch.png",
    ],
  },
  {
    id: "round-3a",
    kicker: "Round 3a · Dec 2025 – Jan 2026",
    title: "Comp\nanalysis +\nGoogle AI\ncopy.",
    body: "Jessica wasn't satisfied after NYC, so we went deeper. A full competitive read — and Cosmin's AI dream for how creative should target copy. Het reframed Google as a quality/rank-score problem, not a budget one. We AI'd the Google copy pipeline end-to-end, landing keyword-to-LP message match at scale.",
    pullQuote:
      "Chat told me it wasn't necessary to use all 15 headlines. Chat knows nothing. — Het, standing up for Better's ad strength",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#fafaf9",
    Icon: Cog,
    gif: {
      caption: "google copy, ai'd",
      tilt: 0,
      emoji: "🔎",
      src: "/moments/statics/mansplaining.png",
      asPhoto: true,
    },
  },
  {
    id: "round-3b",
    kicker: "Round 3b · Feb 2026 · Betsy",
    title: "Then\nthey asked\nfor Betsy.",
    body: "Cold submission. No meeting. No voiceover. PowerPoint only. This is where the other agency shit the bed. Jessica couldn't get past it — so disappointed they missed the brief and didn't call or check in to make sure they were clear. Every POV on our side got QA'd and challenged inside the team before we shipped. They came back with zero notes.",
    pullQuote:
      "In powerpoint no less, which we all know our preferred outlet [sic]. — Coke, on Betsy",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Cog,
    stat: { value: "0", label: "notes back from the client" },
    gif: {
      caption: "betsy · semi-static 1",
      tilt: 0,
      emoji: "🤖",
      src: "/moments/betsy-1.gif",
      asPhoto: true,
    },
    creativeGallery: ["/moments/betsy-2.gif", "/moments/betsy-3.gif"],
  },
  {
    id: "fight",
    kicker: "Fight to the death · Feb–Mar 2026",
    title: "Sly already\nhad the\nrejection\ndrafted.",
    body: "Jump450 swooped in with 3 free months and a 4.5% Y1 undercut. Sly called Nima: we'd fallen to #2. While we waited, everyone kept guessing the odds: 90% → 75% → 50% → 90% → 95!! → 30% → 95. Then Nima and Val took a different approach to pricing — one that used performance as the reward, showing we stand behind our work. And then Nima slid a copy of Skin in the Game onto Sly's desk. No note. It was late one night. Sly was burnt out, frustrated, just done. Then he saw it. Opened it. Knew right away what it was and what it meant. That moved the needle. March 20: 90-day trial secured.",
    pullQuote:
      "He saw it. Opened it. Knew right away what it was and what it meant.",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Network,
    stat: { value: "#2 → #1", label: "the odds swung every hour" },
    gif: {
      caption: "the book nima left",
      tilt: 0,
      emoji: "📕",
      src: "/moments/skin-in-the-game.jpg",
      asPhoto: true,
    },
  },
  {
    id: "kickoff",
    kicker: "Kickoff · April 20 2026 · NYC",
    title: "Jessica\nkissed her\nlaptop.",
    body: "We flew in. The client sent no agenda, no kickoff questions, no prep. So we turned the meeting into a live strategy conversation. Haley walked Jessica through the hub she'd built. Het explained Paid Search. Mariate did Meta. Coke quarterbacked. Nima closed. Client pivoted mid-day and handed us $1.5M incremental — $1M of it in May. The huge push to incorporate AI quickly and intentionally — along with individual curiosity and drive — resulted in this hub. It proved our worth. (Scroll down to see it.)",
    pullQuote:
      "They didn't ask for it. But they needed it. — Haley",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#fafaf9",
    Icon: Sparkles,
    stat: {
      value: "$1.5M",
      label: "incremental budget handed to us by lunch",
    },
    gif: {
      caption: "the laptop kiss",
      tilt: 0,
      emoji: "💋",
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHVybmxtaWxlZmx5cDdjMWpjbHY1djR6NDV0eXVhNHEyOXdvbzd3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W1hd3uXRIbddu/giphy.gif",
      asPhoto: true,
    },
  },
  {
    id: "onwards",
    kicker: "What we learned",
    title: "Tell\nthe whole\nstory.",
    body: "Stop showing up as four silos with four decks. One story, four voices. Read the RFP between the lines. Build for both \"at a glance\" AND \"with depth.\" Peer-review everything — no one of us is perfect, including AI. Plant the book. Listen past what they said and hear what's at the heart of it. Show. Don't tell.",
    pullQuote:
      "We haven't perfected our craft yet, and that's largely because we never will. We test, we learn, we iterate. That's what makes us us. — Coke",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#014737",
    Icon: Rocket,
    gif: {
      caption: "mic drop",
      tilt: 0,
      emoji: "🎤",
      src: "https://media.giphy.com/media/15BuyagtKucHm/giphy.gif",
      asPhoto: true,
    },
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
  const darkPanel = isOutro; // deep-green closer → invert text

  // Element-level openness (builds open, then closes)
  const oKicker = openness(local, -0.95, -0.35, 0.4, 0.95);
  const oTitle = openness(local, -0.85, -0.25, 0.35, 0.9);
  const oBody = openness(local, -0.7, -0.1, 0.3, 0.85);
  const oExtras = openness(local, -0.55, 0.05, 0.25, 0.8);

  // Parallax offsets relative to local (in px) — more amplitude
  const parallaxTitle = local * -90;
  const parallaxBody = local * -60;
  const parallaxGif = local * 140;
  const parallaxDeliv = local * -140;
  const parallaxQuote = local * -45;
  const parallaxStat = local * 70;
  const parallaxNumeral = local * -240;

  const { Icon } = chapter;
  const inkTitle = darkPanel ? "text-white" : "text-zinc-900";
  const inkBody = darkPanel ? "text-white/80" : "text-zinc-600";
  const inkQuote = darkPanel ? "text-white" : "text-zinc-800";
  const numeralColor = darkPanel ? "rgba(255,255,255,0.06)" : "rgba(9,9,11,0.045)";

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
            className={`font-semibold leading-[0.95] tracking-tight whitespace-pre-line ${inkTitle} ${
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
            className={`${inkBody} text-lg md:text-xl leading-relaxed max-w-xl ${isCover || isOutro ? "mx-auto" : ""}`}
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
              className={`mt-6 pl-4 border-l-4 italic ${inkQuote} text-lg max-w-xl`}
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
          <div className="relative flex flex-col items-center gap-4">
            {chapter.gif && (
              <GifPlaceholder
                gif={chapter.gif}
                accent={chapter.accent}
                accent2={chapter.accent2}
                openness={oExtras}
                offsetX={parallaxGif}
              />
            )}
            {chapter.gallery && chapter.gallery.length > 0 && (
              <ChapterGallery items={chapter.gallery} openness={oExtras} offsetX={parallaxDeliv} label="the day" />
            )}
            {chapter.creativeGallery && chapter.creativeGallery.length > 0 && (
              <ChapterGallery items={chapter.creativeGallery} openness={oExtras} offsetX={parallaxDeliv * -1} label="the work" />
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
  const dims = size === "lg" ? "w-[28rem] h-[22rem]" : size === "sm" ? "w-56 h-44" : "w-80 h-64";
  const isPhoto = gif.asPhoto === true;
  const isScroll = Array.isArray(gif.scrollPages) && gif.scrollPages.length > 0;
  return (
    <div
      className={`relative ${dims} rounded-3xl overflow-hidden ${isPhoto || isScroll ? "shadow-2xl bg-white" : "shadow-xl"}`}
      style={{
        opacity: openness,
        transform: `translate3d(${offsetX}px, ${(1 - openness) * 30}px, 0) rotate(${isPhoto || isScroll ? 0 : gif.tilt}deg) scale(${lerp(0.94, 1, openness)})`,
        background: isPhoto || isScroll ? "#ffffff" : `linear-gradient(135deg, ${accent}33, ${accent2}33)`,
        border: isPhoto || isScroll ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.6)",
      }}
    >
      {isScroll ? (
        <div className="notion-scroll flex flex-col">
          {[...gif.scrollPages!, ...gif.scrollPages!].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="w-full block"
            />
          ))}
        </div>
      ) : gif.src ? (
        /\.(mp4|mov|webm)$/i.test(gif.src) ? (
          <video
            src={gif.src}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full ${isPhoto ? "object-contain" : "object-cover"}`}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gif.src}
            alt={gif.caption}
            className={`absolute inset-0 w-full h-full ${isPhoto ? "object-contain" : "object-cover"}`}
            loading="lazy"
          />
        )
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="ecosystem-wobble text-7xl select-none">{gif.emoji}</div>
          </div>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `repeating-linear-gradient(45deg, ${accent}11 0 8px, transparent 8px 16px)`,
            }}
          />
        </>
      )}
      {!isPhoto && !isScroll && (
        <>
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
        </>
      )}
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

function ChapterGallery({
  items,
  openness,
  offsetX,
  label,
}: {
  items: string[];
  openness: number;
  offsetX: number;
  label?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i == null ? null : Math.max(0, i - 1))),
    []
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i == null ? null : Math.min(items.length - 1, i + 1)
      ),
    [items.length]
  );

  useEffect(() => {
    if (openIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  return (
    <>
      <div
        className="w-[28rem] max-w-full"
        style={{
          opacity: openness,
          transform: `translate3d(${offsetX * 0.5}px, ${(1 - openness) * 20}px, 0)`,
        }}
      >
        {label && (
          <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-2">
            {label}
          </div>
        )}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
          {items.map((src, i) => {
            const isVideo = /\.(mp4|mov|webm)$/i.test(src);
            return (
              <button
                key={src}
                onClick={() => setOpenIndex(i)}
                className="group relative flex-shrink-0 w-40 h-52 rounded-xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-lg transition-shadow"
                aria-label={`Open ${src.split("/").pop()}`}
              >
                {isVideo ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {openIndex != null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl"
            aria-label="Close"
          >
            ×
          </button>
          {openIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl"
              aria-label="Previous"
            >
              ‹
            </button>
          )}
          {openIndex < items.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl"
              aria-label="Next"
            >
              ›
            </button>
          )}
          {/\.(mp4|mov|webm)$/i.test(items[openIndex]) ? (
            <video
              src={items[openIndex]}
              autoPlay
              loop
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-md shadow-2xl"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={items[openIndex]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-md shadow-2xl"
            />
          )}
        </div>
      )}
    </>
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
            background: "linear-gradient(90deg, #09090b 0%, #014737 100%)",
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
