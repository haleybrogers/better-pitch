"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Radio,
  Lightbulb,
  Cog,
  Network,
  Rocket,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────── */
/*  CHAPTERS                                                         */
/* ─────────────────────────────────────────────────────────────── */

type GifSpec = {
  caption: string;
  tilt: number;
  emoji: string;
  src?: string;
  asPhoto?: boolean;
  playbackRate?: number; // for slowing down jittery videos
};

type Chapter = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  pullQuote?: string;
  accent: string;
  accent2: string;
  bg: string;
  Icon: typeof Sparkles;
  gif?: GifSpec;
  leadGif?: GifSpec; // small media rendered between the chapter marker and text
  heroSize?: "sm" | "md" | "lg";
  stat?: { value: string; label: string };
  gallery?: string[];
  creativeGallery?: string[];
  learning?: string;
};

const chapters: Chapter[] = [
  {
    id: "title",
    kicker: "Pearmill × Better",
    title: "From Silos\nto Ecosystem.",
    body: "What Better taught us.",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Sparkles,
  },
  {
    id: "cover",
    kicker: "The ride",
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
      tilt: 0,
      emoji: "🎢",
      src: "https://media.giphy.com/media/gHfdhl5JCAySFfkgTy/giphy.gif",
    },
  },
  {
    id: "round-1",
    kicker: "Round 1 · Oct 2025 · the old way",
    title: "We got in\nthe door.",
    body: "We really hooked them with our knowledge. Jessica wanted a deeper dive into competitors — Nima suggested we fly to NYC to present it. Jessica turned it into a full RFP, opened the call to more agencies. Meanwhile we sent an audit. An infinite, siloed Notion doc. The old way.",
    pullQuote:
      "We really hooked them with our knowledge. — Donovan, recalling the first call",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#fafaf9",
    Icon: Radio,
    gif: {
      caption: "the notion audit",
      tilt: 0,
      emoji: "📜",
      src: "/moments/notion-scroll.mov",
      asPhoto: true,
    },
    leadGif: {
      caption: "in the door",
      tilt: 0,
      emoji: "🚪",
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajdwNWM2bnA1a2U3dmxuejByY2QzZTdqaG1qOTUxcXhvbHVhOG5zYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aCPVTaKjiYIPvsk/giphy.gif",
    },
    learning:
      "We probably should have baked the competitive deep dive into the first audit — it's what the client was really asking for.",
  },
  {
    id: "round-2",
    kicker: "Round 2 · Nov 18 2025 · NYC",
    title: "We brought\ncake.",
    body: "We unified the message. Creative, media, and measurement threaded as one. But Sly and Josh had written the RFP themselves — scrappy, first time — and we read it wrong. We overshot the moon with creative. Then Jessica never even opened it; it lived in Notion. Even Sly dismissed it at first because of the collapsed toggles. When he came back to it late one night, he told us our RFP response cooked every other agency. Jessica kept asking him which agency did X best, which did Y best. His answer was Pearmill, every time.",
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
      "/moments/nyc-day-1.mov",
      "/moments/nyc-team.jpg",
      "/moments/nyc-walk-1.mov",
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
    learning:
      "Consider the audience — but find diverse ways to show the work, at-a-glance AND with depth. The format missed both Sly and Jessica, for opposite reasons.",
  },
  {
    id: "round-3a",
    kicker: "Round 3a · Dec 2025 – Jan 2026",
    title: "Yet another\ncall.",
    body: "Coming out of NYC, Jessica was worried our creative wasn't backed enough by industry knowledge and competitive analysis. She was ready to move on — Josh saved it: \"wait, these guys have the creative chops to make really inventive work.\" So Jessica asked us (again) to go deeper on competitors. Another agency had taken their best-performing ads and iterated on them — the client loved that. She also wanted more evidence of Google copy and creative. Het reframed Google as a quality/rank-score problem, not a budget one. We AI'd the Google copy pipeline end-to-end, landing keyword-to-LP message match at scale.",
    pullQuote:
      "Chat told me it wasn't necessary to use all 15 headlines. Chat knows nothing. — Het, standing up for Better's ad strength",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#fafaf9",
    Icon: Cog,
    leadGif: {
      caption: "yet another call",
      tilt: 0,
      emoji: "📞",
      src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExczdjamdvYXViYmt1eWF3aDI4bW5wZGl0djVyZjJ4Yjl2d292cDdiaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vbgh6TfC30eqOtEkuD/giphy.gif",
    },
    gif: {
      caption: "google copy, ai'd live",
      tilt: 0,
      emoji: "🔎",
      src: "/moments/yet-another-call.mp4",
      asPhoto: true,
      playbackRate: 0.4,
    },
  },
  {
    id: "round-3b",
    kicker: "Round 3b · Feb 2026 · Betsy",
    title: "Then\nthey asked\nfor Betsy.",
    body: "Cold submission. No meeting. No voiceover. PowerPoint only. Other agencies shit the bed — Jessica was so disappointed they missed the brief and never called to check in. We read, and re-read, what Betsy needed. We have the expertise, but we listened to what they were actually asking, and then we went deeper. What's at the heart of it. Every POV on our side got QA'd inside the team before we shipped. Huge shoutout to creative for turning around client-winning work in two days. They came back with zero notes.",
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
    creativeGallery: [
      "/moments/betsy-2.gif",
      "/moments/betsy-3.gif",
      "/moments/betsy-ai-girlie.mp4",
      "/moments/betsy-likegpt.mp4",
    ],
    learning:
      "Listen past what they said to what's at the heart of it. When in doubt, pick up the phone — Nima emailed Sly every time we had a question.",
  },
  {
    id: "fight",
    kicker: "Fight to the death · Feb–Mar 2026",
    title: "Sly already\nhad the\nrejection\ndrafted.",
    body: "Jump450 swooped in with 3 free months and a 4.5% Y1 undercut. Sly called Nima: we'd fallen to #2. Then Nima and Val took a different approach to pricing — one that used performance as the reward, showing we stand behind our work. And then Nima slid a copy of Skin in the Game onto Sly's desk. No note. It was late one night. Sly was burnt out, frustrated, just done. Then he saw it. Opened it. Knew right away what it was and what it meant. That moved the needle. March 20: 90-day trial secured.",
    pullQuote:
      "He saw it. Opened it. Knew right away what it was and what it meant.",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Network,
    stat: { value: "#2 → #1", label: "the odds swung every hour" },
    heroSize: "sm",
    leadGif: {
      caption: "betsy, triumphant",
      tilt: 0,
      emoji: "👑",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXhjMDR5eTFpczNjeW9hcXE4d3VmOGE3Zmo4Mm92cWZ6c3ZpampyaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cZ6FrnA4NIuVUPgZMz/giphy.gif",
    },
    gif: {
      caption: "the book nima left",
      tilt: 0,
      emoji: "📕",
      src: "/moments/skin-in-the-game.jpg",
      asPhoto: true,
    },
    gallery: [
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cmsxaWdvdXA4Yngya3JtOGIwMW1vMnZvNDBqeHgzNDd6cnJqa3I4ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qXAHMsQs6emkWwSQSn/giphy.gif",
    ],
    learning:
      "Every touch point — even pricing — is a chance to prove you actually understood them.",
  },
  {
    id: "kickoff",
    kicker: "Kickoff · April 20 2026 · NYC",
    title: "Jessica\nkissed her\nlaptop.",
    body: "A strategy conversation without a kickoff. We sent kickoff questions that never got answered. We found out the week before — if you can even call it a week — that we'd be flying in. Each of us had to pivot our approach to make the client feel like they could trust us to hit goals they themselves deem impossible. Haley walked Jessica through the hub she'd built. Het explained Paid Search. Mariate did Meta. Coke quarterbacked. Nima closed. They walked out of that room thinking: if we don't hit those goals, it's not our team. OUR team — because Jessica trusted us enough to claim us as her own. Client pivoted mid-day and handed us $1.5M incremental — $1M of it in May.",
    pullQuote: "They didn't ask for it. But they needed it. — Haley",
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
    gallery: ["/moments/kickoff-selfie.jpg"],
    learning:
      "Adapting in real time is the job. Curiosity and a hard push to use AI — quickly, intentionally, together — is what built this hub. That's what proved our worth.",
  },
  {
    id: "onwards",
    kicker: "What we learned",
    title: "Tell\nthe whole\nstory.",
    body: "Stop showing up as four silos with four decks. One story, four voices. Read the RFP between the lines. Build for both \"at a glance\" AND \"with depth.\" Peer-review everything — no one of us is perfect, including AI. Plant the book. Listen past what they said and hear what's at the heart of it. Show. Don't tell.",
    pullQuote:
      "We haven't perfected our craft yet, and that's largely because we never will. We test, we learn, we iterate. That's what makes us us. — Coke",
    accent: "#ffffff",
    accent2: "#d1fae5",
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

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function clamp(min: number, max: number, v: number) {
  return Math.max(min, Math.min(max, v));
}

function openness(
  p: number,
  openStart = -0.95,
  openEnd = -0.3,
  closeStart = 0.3,
  closeEnd = 0.95
) {
  const open = clamp01((p - openStart) / (openEnd - openStart));
  const close = 1 - clamp01((p - closeStart) / (closeEnd - closeStart));
  return Math.min(open, close);
}

/* ─────────────────────────────────────────────────────────────── */
/*  Main component — natural-width filmstrip, vertical scroll drives */
/*  horizontal translate                                              */
/* ─────────────────────────────────────────────────────────────── */

export function EcosystemTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [panelBounds, setPanelBounds] = useState<
    { left: number; width: number }[]
  >([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReducedMotion(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    setTrackWidth(trackRef.current.scrollWidth);
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    const panels = Array.from(trackRef.current.children) as HTMLElement[];
    setPanelBounds(
      panels.map((p) => ({ left: p.offsetLeft, width: p.offsetWidth }))
    );
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    // One extra pass after fonts/images settle
    const t = setTimeout(measure, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      setScrollY(window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollDistance = Math.max(0, trackWidth - viewport.w);
  const wrapperHeight = scrollDistance + viewport.h;
  const translateX = -clamp(0, scrollDistance, scrollY);
  const progress = scrollDistance > 0 ? clamp01(scrollY / scrollDistance) : 0;

  // Active chapter = whichever panel's center is closest to viewport center.
  const viewportCenter = -translateX + viewport.w / 2;
  let activeIndex = 0;
  let bestDist = Infinity;
  panelBounds.forEach((p, i) => {
    const c = p.left + p.width / 2;
    const d = Math.abs(c - viewportCenter);
    if (d < bestDist) {
      bestDist = d;
      activeIndex = i;
    }
  });
  const activeChapter = chapters[activeIndex] ?? chapters[0];

  if (reducedMotion) {
    return <ReducedStack />;
  }

  // Black-fade kicks in as we approach the very end.
  const blackFade = clamp01((progress - 0.94) / 0.06);

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight || "100vh" }}
      className="relative"
      aria-label="Horizontal timeline: From Silos to Ecosystem"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden transition-[background-color] duration-700 ease-out"
        style={{ backgroundColor: activeChapter.bg }}
      >
        <ParallaxBackdrop progress={progress} chapter={activeChapter} />

        {/* Fixed header */}
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
          ref={trackRef}
          className="flex h-full items-stretch"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          {chapters.map((ch, i) => {
            const p = panelBounds[i];
            let local = 0;
            if (p) {
              const center = p.left + p.width / 2;
              const diff = center - viewportCenter;
              const half = (p.width + viewport.w) / 2;
              local = clamp(-1, 1, diff / half);
            }
            return (
              <ChapterPanel key={ch.id} chapter={ch} index={i} local={local} />
            );
          })}
        </div>

        {/* Fade-to-black overlay for the outro */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            background: "#000",
            opacity: blackFade,
          }}
        />

        <ProgressRail
          progress={progress}
          activeIndex={activeIndex}
          total={chapters.length}
        />
        <DaysCounter activeIndex={activeIndex} />
        <OddsCounter activeIndex={activeIndex} />
        <ScrollHint hide={progress > 0.02 || scrollDistance === 0} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Parallax backdrop — slow shapes drifting behind the track         */
/* ─────────────────────────────────────────────────────────────── */

function ParallaxBackdrop({
  progress,
  chapter,
}: {
  progress: number;
  chapter: Chapter;
}) {
  const p = progress;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute rounded-full blur-3xl opacity-40 transition-colors duration-700"
        style={{
          width: "50vw",
          height: "50vw",
          top: `${20 - p * 10}%`,
          left: `${-20 + p * 30}%`,
          background: `radial-gradient(circle, ${chapter.accent}30, transparent 60%)`,
          transform: `translate3d(${-p * 200}px, ${p * 60}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          transform: `translate3d(${-p * 400}px, 0, 0)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Chapter panel                                                    */
/* ─────────────────────────────────────────────────────────────── */

function ChapterPanel({
  chapter,
  index,
  local,
}: {
  chapter: Chapter;
  index: number;
  local: number;
}) {
  const isHero = chapter.id === "title" || chapter.id === "cover";
  const isOutro = chapter.id === "onwards";
  void index;

  const oContent = openness(local, -0.95, -0.4, 0.4, 0.95);
  const oExtras = openness(local, -0.85, -0.25, 0.3, 0.9);
  const parallaxX = local * -50;

  if (isHero) {
    return <HeroPanel chapter={chapter} openness={oContent} parallax={parallaxX} />;
  }
  if (isOutro) {
    return <OutroPanel chapter={chapter} openness={oContent} />;
  }
  return (
    <ContentPanel
      chapter={chapter}
      oContent={oContent}
      oExtras={oExtras}
      parallaxX={parallaxX}
    />
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Hero panels (title + cover) — centered, 100vw                    */
/* ─────────────────────────────────────────────────────────────── */

function HeroPanel({
  chapter,
  openness: o,
  parallax,
}: {
  chapter: Chapter;
  openness: number;
  parallax: number;
}) {
  const { Icon } = chapter;
  return (
    <section
      className="relative flex-shrink-0 h-full w-screen flex items-center justify-center px-[6vw]"
      aria-label={chapter.title.replace(/\n/g, " ")}
    >
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] mb-6"
          style={{
            opacity: o,
            transform: `translate3d(${parallax * 0.3}px, ${(1 - o) * 20}px, 0)`,
            background: `${chapter.accent}14`,
            color: chapter.accent,
            border: `1px solid ${chapter.accent}33`,
          }}
        >
          <Icon className="w-3.5 h-3.5" />
          {chapter.kicker}
        </div>
        <h2
          className="font-semibold leading-[0.92] tracking-tight text-zinc-900 whitespace-pre-line text-[clamp(3rem,9vw,8rem)]"
          style={{
            opacity: o,
            transform: `translate3d(${parallax}px, ${(1 - o) * 40}px, 0)`,
          }}
        >
          {chapter.title}
        </h2>
        <div
          className="h-1.5 rounded-full my-6"
          style={{
            width: `${80 * o}px`,
            background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accent2})`,
            opacity: o,
          }}
        />
        <p
          className="text-zinc-600 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{
            opacity: o,
            transform: `translate3d(0, ${(1 - o) * 30}px, 0)`,
          }}
        >
          {chapter.body}
        </p>
        {chapter.pullQuote && (
          <blockquote
            className="mt-6 italic text-zinc-800 text-lg max-w-2xl"
            style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 20}px, 0)` }}
          >
            &ldquo;{chapter.pullQuote}&rdquo;
          </blockquote>
        )}
        {chapter.gif?.src && (
          <div
            className="mt-10"
            style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 30}px, 0)` }}
          >
            <HeroMedia src={chapter.gif.src} caption={chapter.gif.caption} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Outro panel — green with subtle fade-to-black at the right edge  */
/* ─────────────────────────────────────────────────────────────── */

function OutroPanel({
  chapter,
  openness: o,
}: {
  chapter: Chapter;
  openness: number;
}) {
  const { Icon } = chapter;
  return (
    <section
      className="relative flex-shrink-0 h-full w-screen flex items-center justify-center px-[6vw] text-white"
      style={{ backgroundColor: chapter.bg }}
      aria-label={chapter.title.replace(/\n/g, " ")}
    >
      {/* Inner right-edge fade to black */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: "45vw",
          background: "linear-gradient(90deg, transparent 0%, #000 90%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 bg-white/10 border border-white/20 text-white/80"
          style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 20}px, 0)` }}
        >
          <Icon className="w-3.5 h-3.5" />
          {chapter.kicker}
        </div>
        <h2
          className="font-semibold leading-[0.92] tracking-tight whitespace-pre-line text-[clamp(2.5rem,8vw,7rem)]"
          style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 40}px, 0)` }}
        >
          {chapter.title}
        </h2>
        <div className="h-1.5 w-32 rounded-full my-6 bg-white/40" style={{ opacity: o }} />
        <p
          className="text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 30}px, 0)` }}
        >
          {chapter.body}
        </p>
        {chapter.pullQuote && (
          <blockquote
            className="mt-6 italic text-white text-lg max-w-2xl"
            style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 20}px, 0)` }}
          >
            &ldquo;{chapter.pullQuote}&rdquo;
          </blockquote>
        )}
        <div
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#014737] bg-white font-semibold shadow-lg"
          style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 20}px, 0)` }}
        >
          onwards <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Content panel — natural width; text + hero + galleries + learning*/
/*  flow horizontally within one long panel                          */
/* ─────────────────────────────────────────────────────────────── */

function ContentPanel({
  chapter,
  oContent,
  oExtras,
  parallaxX,
}: {
  chapter: Chapter;
  oContent: number;
  oExtras: number;
  parallaxX: number;
}) {
  const hasGallery = chapter.gallery && chapter.gallery.length > 0;
  const hasCreative = chapter.creativeGallery && chapter.creativeGallery.length > 0;

  return (
    <section
      className="relative flex-shrink-0 h-full flex items-center"
      aria-label={chapter.title.replace(/\n/g, " ")}
    >
      <div className="flex items-center gap-10 pl-14 pr-16 h-full py-10">
        {/* 1 · Timeline-node section marker (left rail vibe) */}
        <ChapterMarker chapter={chapter} openness={oContent} />

        {/* 1.5 · Small lead media between marker and text (optional) */}
        {chapter.leadGif?.src && (
          <div
            className="flex-shrink-0"
            style={{
              opacity: oExtras,
              transform: `translate3d(0, ${(1 - oExtras) * 20}px, 0)`,
            }}
          >
            <LeadMedia src={chapter.leadGif.src} caption={chapter.leadGif.caption} />
          </div>
        )}

        {/* 2 · Text + hero */}
        <div className="flex items-center gap-8">
          <div
            className="flex-shrink-0 w-[30rem] flex flex-col justify-center"
            style={{
              opacity: oContent,
              transform: `translate3d(${parallaxX}px, ${(1 - oContent) * 30}px, 0)`,
            }}
          >
            <h2 className="font-semibold leading-[0.98] tracking-tight text-zinc-900 whitespace-pre-line text-[clamp(2.25rem,4.4vw,4.5rem)]">
              {chapter.title}
            </h2>
            <div
              className="h-1.5 w-20 rounded-full my-5"
              style={{
                background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accent2})`,
              }}
            />
            <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
              {chapter.body}
            </p>
            {chapter.pullQuote && (
              <blockquote
                className="mt-5 pl-4 border-l-4 italic text-zinc-800 text-base md:text-lg"
                style={{ borderColor: chapter.accent }}
              >
                &ldquo;{chapter.pullQuote}&rdquo;
              </blockquote>
            )}
            {chapter.stat && (
              <div className="mt-5 self-start inline-flex items-baseline gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-sm border border-zinc-200">
                <span
                  className="text-3xl font-bold tracking-tight"
                  style={{
                    background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {chapter.stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-600">
                  {chapter.stat.label}
                </span>
              </div>
            )}
          </div>

          {chapter.gif?.src && (
            <div
              className="flex-shrink-0"
              style={{
                opacity: oExtras,
                transform: `translate3d(${parallaxX * 0.5}px, ${(1 - oExtras) * 30}px, 0)`,
              }}
            >
              <HeroMedia
                src={chapter.gif.src}
                caption={chapter.gif.caption}
                size={chapter.heroSize ?? "md"}
                playbackRate={chapter.gif.playbackRate}
              />
            </div>
          )}
        </div>

        {/* 3 · Day gallery */}
        {hasGallery && (
          <ChapterGallery
            items={chapter.gallery!}
            openness={oExtras}
            label="the day"
          />
        )}

        {/* 4 · Creative gallery */}
        {hasCreative && (
          <ChapterGallery
            items={chapter.creativeGallery!}
            openness={oExtras}
            label="the work"
          />
        )}

        {/* 5 · Key learning */}
        {chapter.learning && (
          <div
            className="flex-shrink-0 w-[26rem]"
            style={{
              opacity: oExtras,
              transform: `translate3d(0, ${(1 - oExtras) * 20}px, 0)`,
            }}
          >
            <LearningCard text={chapter.learning} accent={chapter.accent} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ChapterMarker — timeline-node vibe at the start of each section  */
/* ─────────────────────────────────────────────────────────────── */

function ChapterMarker({
  chapter,
  openness: o,
}: {
  chapter: Chapter;
  openness: number;
}) {
  const { Icon } = chapter;
  const parts = chapter.kicker.split(" · ");
  const headline = parts[0];
  const detail = parts.slice(1).join(" · ");
  return (
    <div
      className="flex-shrink-0 self-stretch flex items-center"
      style={{ opacity: o }}
    >
      {/* Vertical rail + node */}
      <div className="relative h-full flex flex-col items-center justify-center pr-6">
        <div
          className="w-px flex-1"
          style={{ background: `linear-gradient(180deg, transparent, ${chapter.accent}55 20%, ${chapter.accent}55 80%, transparent)` }}
        />
        <div
          className="my-3 w-4 h-4 rounded-full ring-4 ring-white relative z-10"
          style={{
            background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent2})`,
          }}
        />
        <div
          className="w-px flex-1"
          style={{ background: `linear-gradient(180deg, transparent, ${chapter.accent}55 20%, ${chapter.accent}55 80%, transparent)` }}
        />
      </div>

      {/* Compact label card — smaller than before */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm bg-white"
        style={{ borderColor: `${chapter.accent}26` }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent2})`,
          }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col leading-tight">
          <span
            className="text-xs font-bold uppercase tracking-[0.14em]"
            style={{ color: chapter.accent }}
          >
            {headline}
          </span>
          {detail && (
            <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-0.5">
              {detail}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  HeroMedia — photo/video, natural aspect, no chrome               */
/*  Hero videos autoplay; gallery videos play on hover               */
/* ─────────────────────────────────────────────────────────────── */

function LeadMedia({ src, caption }: { src: string; caption?: string }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);
  const cls =
    "w-44 h-44 md:w-52 md:h-52 rounded-2xl object-cover shadow-lg ring-1 ring-black/5";
  return isVideo ? (
    <video src={src} autoPlay loop muted playsInline className={cls} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={caption ?? ""} loading="lazy" className={cls} />
  );
}

function HeroMedia({
  src,
  caption,
  size = "lg",
  playbackRate,
}: {
  src?: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  playbackRate?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && playbackRate) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);
  if (!src) return null;
  const maxH = size === "lg" ? "max-h-[68vh]" : size === "sm" ? "max-h-[36vh]" : "max-h-[52vh]";
  const mediaCls = `${maxH} w-auto h-auto block rounded-2xl shadow-xl ring-1 ring-black/5 ecosystem-focus`;
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);
  return isVideo ? (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      onLoadedMetadata={() => {
        if (videoRef.current && playbackRate) {
          videoRef.current.playbackRate = playbackRate;
        }
      }}
      className={mediaCls}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={caption ?? ""} loading="lazy" className={mediaCls} />
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  LearningCard — white, clean, left accent rail                    */
/* ─────────────────────────────────────────────────────────────── */

function LearningCard({ text, accent }: { text: string; accent: string }) {
  return (
    <div className="relative rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: accent }}
      />
      <div className="pl-8 pr-7 py-7">
        <div
          className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 flex items-center gap-2"
          style={{ color: accent }}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          Key learning
        </div>
        <p className="text-zinc-900 text-xl leading-[1.35] font-medium">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ChapterGallery — hover-to-play videos + lightbox                 */
/* ─────────────────────────────────────────────────────────────── */

function ChapterGallery({
  items,
  openness: o,
  label,
}: {
  items: string[];
  openness: number;
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
        className="flex-shrink-0 flex flex-col justify-center gap-3"
        style={{ opacity: o }}
      >
        {label && (
          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
            {label}
          </div>
        )}
        <div className="flex gap-3">
          {items.map((src, i) => (
            <GalleryTile
              key={src}
              src={src}
              onClick={() => setOpenIndex(i)}
            />
          ))}
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

function GalleryTile({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);
  // For giphy-hosted .gif urls, they animate natively — no hover trick needed.

  const handleEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play();
    }
  };
  const handleLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group relative flex-shrink-0 w-48 h-64 rounded-xl overflow-hidden bg-zinc-100 cursor-zoom-in ring-1 ring-black/5 ecosystem-focus"
      aria-label={`Open ${src.split("/").pop()}`}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={`${src}#t=0.1`}
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Bottom HUD: progress rail + counters                             */
/* ─────────────────────────────────────────────────────────────── */

function ProgressRail({
  progress,
  activeIndex,
  total,
}: {
  progress: number;
  activeIndex: number;
  total: number;
}) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full shadow-md border border-white">
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
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-5 bg-zinc-900" : "w-1.5 bg-zinc-300"
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

// Emotional arc — never 100% (no signed SOW yet)
const ODDS = [0, 0, 40, 85, 30, 90, 15, 95, 97];
const DAYS = [0, 0, 1, 48, 75, 125, 140, 202, 202];

function useSmoothedValue(target: number) {
  const [value, setValue] = useState(target);
  const ref = useRef(target);
  useEffect(() => {
    let raf = 0;
    const step = () => {
      const diff = target - ref.current;
      if (Math.abs(diff) < 0.5) {
        ref.current = target;
        setValue(target);
        return;
      }
      ref.current = ref.current + diff * 0.15;
      setValue(ref.current);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

function OddsCounter({ activeIndex }: { activeIndex: number }) {
  const target = ODDS[Math.min(activeIndex, ODDS.length - 1)] ?? 0;
  const value = useSmoothedValue(target);
  const rounded = Math.round(value);
  const color =
    rounded >= 75 ? "#047857" : rounded >= 50 ? "#b45309" : "#b91c1c";
  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2.5 bg-white/85 backdrop-blur px-4 py-2.5 rounded-full shadow-md border border-white">
      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold">
        odds we&rsquo;d win
      </span>
      <span
        className="text-2xl font-bold tabular-nums transition-colors duration-500"
        style={{ color }}
      >
        {rounded}%
      </span>
    </div>
  );
}

function DaysCounter({ activeIndex }: { activeIndex: number }) {
  const target = DAYS[Math.min(activeIndex, DAYS.length - 1)] ?? 0;
  const value = useSmoothedValue(target);
  return (
    <div className="absolute bottom-6 left-6 z-30 flex items-baseline gap-2.5 bg-white/85 backdrop-blur px-4 py-2.5 rounded-full shadow-md border border-white">
      <span className="text-2xl font-bold tabular-nums text-zinc-900">
        {Math.round(value)}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold leading-none">
        days
        <br />
        to win
      </span>
    </div>
  );
}

function ScrollHint({ hide }: { hide: boolean }) {
  return (
    <div
      className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-xs text-zinc-500 transition-opacity duration-500 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <span className="ecosystem-bounce">↓</span>
      <span className="uppercase tracking-[0.2em]">scroll to begin</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Reduced-motion fallback                                          */
/* ─────────────────────────────────────────────────────────────── */

function ReducedStack() {
  return (
    <div className="min-h-screen bg-white">
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
                &ldquo;{ch.pullQuote}&rdquo;
              </blockquote>
            )}
            {ch.learning && (
              <LearningCard text={ch.learning} accent={ch.accent} />
            )}
            {i < chapters.length - 1 && <hr className="border-zinc-200 mt-10" />}
          </section>
        ))}
      </div>
    </div>
  );
}
