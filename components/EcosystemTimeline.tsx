"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
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
  slackQuote?: {
    author: string;
    time: string;
    avatarInitials: string;
    avatarColor: string;
    text: string;
    boldPrefix?: string;
    reactions: { emoji: string; count: number }[];
  }[];
  accent: string;
  accent2: string;
  bg: string;
  Icon: typeof Sparkles;
  gif?: GifSpec;
  leadGif?: GifSpec; // small media rendered between the chapter marker and text
  heroSize?: "sm" | "md" | "lg";
  dashboard?: {
    videoSrc?: string;
    posterSrc?: string;
    href: string;
    password?: string;
    label?: string;
  };
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
    body: "Seven months. One pitch. The odds swung every hour.",
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
    body: "Our channel expertise landed the first meeting. Jessica wanted a deeper dive into competitors — Nima suggested we fly to NYC to present it. Jessica turned it into a full RFP, opened the call to more agencies. Meanwhile we sent an audit: an infinite, siloed Notion doc. The old way. Sly was underwhelmed at first — didn't realize how deep the doc actually went. Then he kept clicking. HUH?! It just kept getting better and better and better. Little did we know — Jessica hated Notion and never even opened it.",
    pullQuote: "Didn't realize how deep this thing went. — Sly, underwhelmed at first",
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
      playbackRate: 0.35,
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
    body: "We flew to New York to pitch in person. Beautiful slide deck, unified message — creative, media, and measurement threaded as one. And we brought cake. But Sly and Josh had written the RFP themselves — scrappy, first time — and we'd read it wrong. We overshot the moon with creative. Even though it wasn't what Jessica wanted, he told us our RFP response cooked every other agency. Jessica kept asking him which agency did X best, which did Y best. His answer was Pearmill, every time.",
    pullQuote:
      "Your RFP response cooked every other agency. — Sly, very late one night",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Lightbulb,
    leadGif: {
      caption: "we brought cake",
      tilt: 0,
      emoji: "🎂",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmg3MnBtaWMzZDF3cjcyb3o4a2VrYnlhZjUxeHhodDlnYXFuN3hjcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/H4G8stNXKcyQ0/giphy.gif",
    },
    gif: {
      caption: "the actual cake",
      tilt: 0,
      emoji: "🎂",
      src: "/moments/cake.jpg",
      asPhoto: true,
    },
    gallery: [
      "/moments/nyc-day-extra.mov",
      "/moments/nyc-day-1.mov",
      "/moments/nyc-team.jpg",
    ],
    creativeGallery: [
      "/moments/statics/sensitive-tummies.mp4",
      "/moments/statics/cake-creative.png",
      "/moments/statics/hotel-key.png",
      "/moments/statics/scared-of-carl.mp4",
      "/moments/statics/cortisol-shirt.png",
      "/moments/statics/melanoma.png",
      "/moments/statics/coffee-cup.png",
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
      "Chat told me it wasn't necessary to use all 15 headlines. Chat knows nothing. — Het",
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
    creativeGallery: ["/moments/yet-another-call-end.png"],
  },
  {
    id: "round-3b",
    kicker: "Round 3b · Feb 2026 · Betsy",
    title: "Then\nthey asked\nfor Betsy.",
    body: "Cold submission. No meeting. No voiceover. PowerPoint only. Luckily for us, the other agencies shit the bed — Jessica was so disappointed they missed the brief and never called to check in. We read, and re-read, what Betsy needed. We have the expertise, but we listened to what they were actually asking, and then we went deeper. What's at the heart of it. Huge shoutout to creative for turning around client-winning work in two days. They came back with zero notes.",
    pullQuote:
      "In powerpoint no less, which we all know our preferred outlet. — Coke, on Betsy",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Cog,
    stat: { value: "0", label: "notes back from the client" },
    leadGif: {
      caption: "unimpressed",
      tilt: 0,
      emoji: "😒",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXhjMDR5eTFpczNjeW9hcXE4d3VmOGE3Zmo4Mm92cWZ6c3ZpampyaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cZ6FrnA4NIuVUPgZMz/giphy.gif",
    },
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
    body: "Jump450 swooped in with 3 free months and a 4.5% Y1 undercut. Sly called Nima: we'd fallen to #2. Then Nima and Val took a different approach to pricing — one that used performance as the reward, showing we stand behind our work. Weeks earlier, Nima had quietly slid a copy of Skin in the Game onto Sly's desk. No note. Sly hadn't even noticed it. Then one late night at the office, he saw it. Opened it. Knew right away what it was and what it meant. That moved the needle. March 20: 90-day trial secured.",
    accent: "#014737",
    accent2: "#09090b",
    bg: "#ffffff",
    Icon: Network,
    heroSize: "sm",
    leadGif: {
      caption: "there can only be 1",
      tilt: 0,
      emoji: "🤖",
      src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVmcjNsZWh0cjhlaXloeXZ0MDhyMXg3cG12cGlwc21zcmU5c3MzYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ydhTdPES8pJ5BRF9TP/giphy.gif",
    },
    gif: {
      caption: "the book nima left",
      tilt: 0,
      emoji: "📕",
      src: "/moments/skin-in-the-game.jpg",
      asPhoto: true,
    },
    learning:
      "Every touch point — even pricing — is a chance to prove you actually understood them.",
  },
  {
    id: "kickoff",
    kicker: "Kickoff · April 20 2026 · NYC",
    title: "Closed\nwith a kiss.",
    body: "So we flew to NYC for an in-person kickoff. A strategy conversation without an actual kickoff — we sent kickoff questions that never got answered. We found out the week before — if you can even call it a week — that we'd be flying in. Each of us had to pivot our approach to make the client feel like they could trust us to hit goals they themselves deem impossible. Haley walked Jessica through the hub she'd built. Het explained Paid Search. Mariate did Meta. Coke quarterbacked. Nima closed. They walked out of that room thinking: if we don't hit those goals, it's not our team. OUR team — because Jessica trusted us enough to claim us as her own. Client pivoted mid-day and handed us $1.5M incremental — $1M of it in May.",
    slackQuote: [
      {
        author: "Coke",
        time: "2:05 PM",
        avatarInitials: "C",
        avatarColor: "#8b6f47",
        boldPrefix: "Running tally:",
        text: "Het is the smartest person in the room & Haley is a badass\n\nquality callouts, I think",
        reactions: [
          { emoji: "🙌", count: 5 },
          { emoji: "🧠", count: 5 },
          { emoji: "💯", count: 2 },
          { emoji: "🍑", count: 5 },
          { emoji: "❗", count: 2 },
        ],
      },
      {
        author: "nima",
        time: "2:12 PM",
        avatarInitials: "n",
        avatarColor: "#c4352f",
        text: "Also Jessica kissed her laptop when she saw Haley's dashboard",
        reactions: [
          { emoji: "👆", count: 4 },
          { emoji: "💋", count: 5 },
        ],
      },
    ],
    accent: "#014737",
    accent2: "#09090b",
    bg: "#fafaf9",
    Icon: Sparkles,
    leadGif: {
      caption: "Jessica kissing her laptop",
      tilt: 0,
      emoji: "🐱",
      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHVybmxtaWxlZmx5cDdjMWpjbHY1djR6NDV0eXVhNHEyOXdvbzd3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W1hd3uXRIbddu/giphy.gif",
    },
    dashboard: {
      videoSrc: "/moments/kickoff-dashboard.mov",
      href: "https://better-portal-two.vercel.app",
      password: "deathpledge",
      label: "Open the dashboard",
    },
    gallery: [
      "/moments/kickoff-selfie.jpg",
      "/moments/kickoff-call.png",
      "/moments/kickoff-dinner.jpg",
    ],
    learning:
      "Adapting in real time is the job. Curiosity and a hard push to use AI — quickly, intentionally, together — is what built this hub. That's what proved our worth.",
  },
  {
    id: "onwards",
    kicker: "What we learned",
    title: "Tell\nthe whole\nstory.",
    body: "Stop showing up as four silos with four sprawling Notion docs. One story, four voices. Read the RFP between the lines. Build for both \"at a glance\" AND \"with depth.\" Peer-review everything — no one of us is perfect, including AI. Plant the book. Listen past what they said and hear what's at the heart of it. Show. Don't tell.",
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
  {
    id: "dm",
    kicker: "One more thing",
    title: "Then the competitor\nDM'd us.",
    body: "Just to be sure. — Us.",
    accent: "#ffffff",
    accent2: "#d1fae5",
    bg: "#09090b",
    Icon: Sparkles,
    gif: {
      caption: "the DM",
      tilt: 0,
      emoji: "📩",
      src: "/moments/competitor-dm.png",
      asPhoto: true,
    },
  },
  {
    id: "endcard",
    kicker: "",
    title: "Better × Pearmill",
    body: "",
    accent: "#ffffff",
    accent2: "#d1fae5",
    bg: "#09090b",
    Icon: Sparkles,
  },
];

/* ─────────────────────────────────────────────────────────────── */
/*  Helpers                                                          */
/* ─────────────────────────────────────────────────────────────── */

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

// rAF-based lerp: returns a value that eases toward `target` each frame.
// Smooths jumpy scroll deltas and releases from scroll-hold clamps.
function useLerp(target: number, factor = 0.15) {
  const [value, setValue] = useState(target);
  const currentRef = useRef(target);
  const targetRef = useRef(target);
  targetRef.current = target;
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      const diff = t - c;
      if (Math.abs(diff) > 0.25) {
        currentRef.current = c + diff * factor;
        setValue(currentRef.current);
        raf = requestAnimationFrame(tick);
      } else if (c !== t) {
        currentRef.current = t;
        setValue(t);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, factor]);
  return value;
}

// Scroll-triggered, time-based reveal. Returns a 0→1 progress that plays out
// over `durationMs` once `triggered` flips to true, decoupled from scroll
// deltas so the animation stays smooth regardless of jumpy trackpad input.
// Resets to 0 if the trigger flips back off (e.g. user scrolls above it).
function useTriggeredReveal(triggered: boolean, durationMs: number) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  useEffect(() => {
    if (!triggered) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      progressRef.current = 0;
      setProgress(0);
      return;
    }
    // Resume from wherever we were so toggling off/on keeps continuity.
    startRef.current = performance.now() - progressRef.current * durationMs;
    const tick = (t: number) => {
      const base = startRef.current ?? t;
      const p = clamp01((t - base) / durationMs);
      progressRef.current = p;
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [triggered, durationMs]);
  return progress;
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

  // "Read position" = the translateX where this chapter sits centered in view.
  // First chapter reads at translate 0 (left-aligned); last reads at -(trackWidth - vw).
  // In between, center each panel when possible.
  const scrollDistance = Math.max(0, trackWidth - viewport.w);
  const readPositions = panelBounds.map((p) =>
    clamp(-scrollDistance, 0, viewport.w / 2 - (p.left + p.width / 2))
  );

  // Dwell zone per chapter: scroll through this much vertical space without moving
  // the track horizontally, so big text stays legible. Travel happens BETWEEN dwells.
  const dwellPerChapter = viewport.h * 0.45;

  const travelDistances = readPositions.slice(1).map((r, i) =>
    Math.abs(r - readPositions[i])
  );
  const totalDwell = readPositions.length * dwellPerChapter;
  const totalTravel = travelDistances.reduce((a, b) => a + b, 0);
  // Trailing buffer = 2× viewport.h so the last chapter (DM) stays pinned
  // long enough to actually read all three beats. Wrapper bg is black so
  // the tail blends into the DM panel.
  const wrapperHeight =
    readPositions.length > 0
      ? totalDwell + totalTravel + viewport.h * 3
      : viewport.h;

  // Scroll-TRIGGERED animations — once the scroll position crosses a panel's
  // threshold, the reveal plays on its own internal timer, regardless of how
  // the user keeps scrolling. This makes the animation feel smooth even when
  // the user's scroll wheel / trackpad delivers jumpy input.

  const heroTrigger = scrollY > viewport.h * 0.25;
  const heroReveal = useTriggeredReveal(heroTrigger, 900);

  const dmIndex = chapters.findIndex((c) => c.id === "dm");
  let dmDwellStart = Infinity;
  let dmDwellEnd = Infinity;
  let dmTriggerScrollY = Infinity;
  if (dmIndex >= 0) {
    let cursor = 0;
    for (let i = 0; i < dmIndex; i++) {
      cursor += dwellPerChapter;
      if (i < travelDistances.length) cursor += travelDistances[i];
    }
    dmDwellStart = cursor;
    dmDwellEnd = dmDwellStart + dwellPerChapter;
    // Trigger exactly when the panel finishes its entry and centers, so the
    // typing starts on a still panel (not one mid-slide). Keeps the text
    // part feeling clean instead of fighting the horizontal motion.
    dmTriggerScrollY = dmDwellStart;
  }
  const dmTrigger = scrollY > dmTriggerScrollY;
  const dmReveal = useTriggeredReveal(dmTrigger, 5800);

  const endcardCenteredAt =
    readPositions.length > 0
      ? (readPositions.length - 1) * dwellPerChapter + totalTravel
      : 0;
  const endcardTrigger = scrollY > endcardCenteredAt + viewport.h * 0.35;
  // Fast title intro (~1.5s), short beat, then a slow credits roll so every
  // line is comfortably readable. Column is compact now so the total can be
  // shorter without feeling rushed.
  const endcardReveal = useTriggeredReveal(endcardTrigger, 70000);

  // Scroll HOLD: don't let the horizontal track leave a chapter until its
  // animation has finished. The user can keep scrolling vertically but the
  // panel stays pinned until the reveal completes.
  let targetScrollY = scrollY;
  if (heroReveal < 1) {
    targetScrollY = Math.min(targetScrollY, dwellPerChapter - 1);
  }
  if (dmIndex >= 0 && dmTrigger && dmReveal < 1) {
    targetScrollY = Math.min(targetScrollY, dmDwellEnd - 1);
  }
  // Smooth so the hold-release transitions from clamped → real without a jump
  // and so jumpy scroll deltas don't visibly stutter the track.
  const effectiveScrollY = useLerp(targetScrollY, 0.22);

  let targetTranslateX = readPositions[0] ?? 0;
  {
    let cursor = 0;
    for (let i = 0; i < readPositions.length; i++) {
      if (effectiveScrollY < cursor + dwellPerChapter) {
        targetTranslateX = readPositions[i];
        break;
      }
      cursor += dwellPerChapter;
      if (i < readPositions.length - 1) {
        const travel = travelDistances[i];
        if (effectiveScrollY < cursor + travel) {
          const t = travel > 0 ? (effectiveScrollY - cursor) / travel : 0;
          targetTranslateX =
            readPositions[i] + (readPositions[i + 1] - readPositions[i]) * t;
          break;
        }
        cursor += travel;
      } else {
        targetTranslateX = readPositions[i];
      }
    }
  }

  const translateX = targetTranslateX;

  const progress =
    wrapperHeight > viewport.h
      ? clamp01(scrollY / (wrapperHeight - viewport.h))
      : 0;

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

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight || "100vh", backgroundColor: "#09090b" }}
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
              <ChapterPanel
                key={ch.id}
                chapter={ch}
                index={i}
                local={local}
                heroReveal={heroReveal}
                dmReveal={dmReveal}
                endcardReveal={endcardReveal}
              />
            );
          })}
        </div>

        <ProgressRail
          progress={progress}
          activeIndex={activeIndex}
          total={chapters.length}
          onSeek={(f) => {
            const h = Math.max(0, wrapperHeight - viewport.h);
            window.scrollTo({ top: f * h, behavior: "smooth" });
          }}
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
  heroReveal,
  dmReveal,
  endcardReveal,
}: {
  chapter: Chapter;
  index: number;
  local: number;
  heroReveal: number;
  dmReveal: number;
  endcardReveal: number;
}) {
  const isHero = chapter.id === "title" || chapter.id === "cover";
  const isOutro = chapter.id === "onwards";
  const isDm = chapter.id === "dm";
  const isEndcard = chapter.id === "endcard";
  void index;

  // No fade when scrolling — content stays fully opaque. Horizontal parallax
  // (via `local`) still applies for a subtle drift.
  const oContent = 1;
  const oExtras = 1;
  const parallaxX = local * -50;

  if (isHero) {
    // Only the opening "title" frame gets the scroll-driven kinetic reveal.
    const kinetic = chapter.id === "title" ? heroReveal : 1;
    return (
      <HeroPanel
        chapter={chapter}
        openness={oContent}
        parallax={parallaxX}
        kinetic={kinetic}
        local={local}
      />
    );
  }
  if (isOutro) {
    return <OutroPanel chapter={chapter} openness={oContent} />;
  }
  if (isDm) {
    return (
      <DmPanel
        chapter={chapter}
        openness={oContent}
        local={local}
        reveal={dmReveal}
      />
    );
  }
  if (isEndcard) {
    return <EndcardPanel chapter={chapter} reveal={endcardReveal} />;
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
  kinetic,
  local,
}: {
  chapter: Chapter;
  openness: number;
  parallax: number;
  kinetic: number;
  local: number;
}) {
  const { Icon } = chapter;
  const isKinetic = kinetic < 1;
  // Defer mounting the hero gif/video until the panel is close to view —
  // otherwise the media starts playing long before the user has scrolled to it.
  const mediaInView = Math.abs(local) < 0.7;
  return (
    <section
      className="relative flex-shrink-0 h-full w-screen flex items-center justify-center px-[6vw] overflow-hidden"
      aria-label={chapter.title.replace(/\n/g, " ")}
    >
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] mb-6 transition-[opacity,transform] duration-300"
          style={{
            opacity: o * easeOutCubic(clamp01((kinetic - 0) / 0.25)),
            transform: `translate3d(${parallax * 0.3}px, ${
              (1 - easeOutCubic(clamp01((kinetic - 0) / 0.25))) * 20 + (1 - o) * 20
            }px, 0)`,
            background: `${chapter.accent}14`,
            color: chapter.accent,
            border: `1px solid ${chapter.accent}33`,
          }}
        >
          <Icon className="w-3.5 h-3.5" />
          {chapter.kicker}
        </div>
        {isKinetic ? (
          <KineticTitle
            title={chapter.title}
            reveal={kinetic}
            parallax={parallax}
          />
        ) : (
          <h2
            className="font-semibold leading-[0.92] tracking-tight text-zinc-900 whitespace-pre-line text-[clamp(3rem,9vw,8rem)]"
            style={{
              opacity: o,
              transform: `translate3d(${parallax}px, ${(1 - o) * 40}px, 0)`,
            }}
          >
            {chapter.title}
          </h2>
        )}
        <div
          className="h-1.5 rounded-full my-6"
          style={{
            width: `${80 * o * easeOutCubic(clamp01((kinetic - 0.6) / 0.3))}px`,
            background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accent2})`,
            opacity: o * easeOutCubic(clamp01((kinetic - 0.6) / 0.3)),
          }}
        />
        <p
          className="text-zinc-600 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{
            opacity: o * easeOutCubic(clamp01((kinetic - 0.7) / 0.3)),
            transform: `translate3d(0, ${
              (1 - easeOutCubic(clamp01((kinetic - 0.7) / 0.3))) * 24 + (1 - o) * 30
            }px, 0)`,
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
        {chapter.gif?.src && mediaInView && (
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

function easeOutCubic(t: number) {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

/* ─────────────────────────────────────────────────────────────── */
/*  KineticTitle — scroll-driven typewriter. Letters "type" in one   */
/*  at a time as the reveal progresses from 0 → 1, with a blinking   */
/*  caret trailing the most recently typed character.                 */
/* ─────────────────────────────────────────────────────────────── */

function KineticTitle({
  title,
  reveal,
  parallax,
}: {
  title: string;
  reveal: number;
  parallax: number;
}) {
  const lines = title.split("\n");
  // Count non-space characters for pacing — spaces feel "instant" but we
  // still render them inline so the line never collapses.
  const totalChars = lines.reduce((n, l) => n + l.replace(/\s+/g, "").length, 0);
  const perCharWindow = totalChars > 0 ? 1 / totalChars : 1;
  // Small crossfade per char so it doesn't pop harshly.
  const fadeWindow = Math.min(perCharWindow * 0.6, 0.04);

  let charIndex = 0;

  return (
    <h2
      aria-label={title.replace(/\n/g, " ")}
      className="font-semibold leading-[0.92] tracking-tight text-zinc-900 text-[clamp(3rem,9vw,8rem)]"
      style={{ transform: `translate3d(${parallax}px, 0, 0)` }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {Array.from(line).map((ch, ci) => {
            if (/\s/.test(ch)) {
              return (
                <span key={`${li}-${ci}`} aria-hidden className="inline">
                  {"\u00a0"}
                </span>
              );
            }
            const i = charIndex++;
            const start = i * perCharWindow;
            const t = clamp01((reveal - start) / fadeWindow);
            return (
              <span
                key={`${li}-${ci}`}
                aria-hidden={t < 1}
                className="inline-block"
                style={{
                  opacity: t,
                  transform: `translate3d(0, ${(1 - t) * 6}px, 0)`,
                  willChange: "opacity, transform",
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
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
/*  Endcard panel — final "Better × Pearmill" splash                 */
/* ─────────────────────────────────────────────────────────────── */

const CREDITS: { name: string; line: string }[] = [
  { name: "Nima", line: "the closer. Walked into every room already winning it." },
  { name: "Donovan", line: "guided the creative. Kept the train on the tracks. Has great hair." },
  { name: "Coke", line: "quarterback. Running-tally author. Peach-emoji provider." },
  { name: "Haley", line: "built the dashboard Jessica kissed. Turned a Notion sprawl into a hub." },
  { name: "Het", line: "smartest person in the room. Paid Search whisperer." },
  { name: "Mariate", line: "Meta POV, measurement brain, quiet operator of the creative engine." },
  { name: "Moojan", line: "the best energy in every room. The person you wanted on every call." },
  { name: "Dino", line: "wooed Jessica. Made her fall in love with him on Pearmill's behalf." },
  { name: "Addie", line: "cast it, produced it, and made it fucking happen — on the weekend." },
  { name: "Karim", line: "picked up the cake. Had drinks waiting for us after the pitch." },
  { name: "Val", line: "morale. Hyped us up. Told us we could do it, mentored us, made it happen." },
  { name: "Masha", line: "made it all happen, no matter what hours her team had to pull." },
  { name: "Janie", line: "in the room for kickoff. Helped me pull it all together, and she's running the account now." },
  { name: "Cosmin", line: "the landing-page guy. When a campaign needs a page that converts, it's his." },
  { name: "Lilya", line: "set the visual language. The look + feel every deck built on started with her." },
  { name: "Polina", line: "layout surgeon. Made every page breathe. Nothing went out looking cramped." },
  { name: "Egor", line: "made the vintage PowerPoint work. In PowerPoint. No less." },
  { name: "Olena", line: "made the creative move, the cuts land, the work feel alive." },
  { name: "Anar", line: "video edited under the gun. Turnaround times that should not have been possible." },
  { name: "Oleh", line: "planted the best easter eggs in Betsy. If you spotted something and smiled, that was him." },
  { name: "The Homeaglow team", line: "impressed the client without being in the room. Sold a $19 cleaning and made Better want what they had." },
  { name: "Claude", line: "built this site with Haley at all hours. Also wrote these credits. Including this one. Obviously." },
];

const SPEECH: string[] = [
  "…and to the ones back home, keeping every other account glowing while we vanished into the Better trenches — we see you. We love you. We owe you about a thousand coffees.",
  "Thank you to every agency that said we couldn't. You lit the fuse.",
  "Thank you to sleep — I'll be seeing you again very soon.",
];

function EndcardPanel({
  chapter,
  reveal,
}: {
  chapter: Chapter;
  reveal: number;
}) {
  const stage = (start: number, end: number) =>
    clamp01((reveal - start) / Math.max(0.001, end - start));
  // VERY FAST intro — Better × Pearmill pops in, then the bar + subtitle
  // cascade in right underneath as one continuous movement. Short beat
  // before the whole column starts scrolling up together.
  const kickerT = stage(0.0, 0.002);
  const logosT = stage(0.001, 0.013);
  const barT = stage(0.012, 0.018);
  const subT = stage(0.014, 0.024);
  const scrollT = stage(0.035, 1.0);
  // Travel so nothing is left on the screen by the end of the roll. Tuned
  // for the compact two-column credits layout.
  const TRAVEL_VH = 260;
  const offsetVh = scrollT * TRAVEL_VH;

  return (
    <section
      className="relative flex-shrink-0 h-full w-screen overflow-hidden text-white"
      style={{ backgroundColor: chapter.bg }}
      aria-label="Better × Pearmill"
    >
      {/* One scrolling column — title card sits at the top, credits + speech
          follow, and the whole thing translates upward as scrollT grows so
          the Better × Pearmill card rides up with the roll. */}
      <div
        className="absolute inset-x-0 flex flex-col items-center pointer-events-none"
        style={{
          // Fixed anchor at 40vh — scroll happens via transform for a GPU-
          // accelerated path. Animating `top` causes layout every frame,
          // which is the source of the jank the user was seeing.
          top: "40vh",
          transform: `translate3d(0, ${-offsetVh}vh, 0)`,
          willChange: "transform",
        }}
      >
        {/* Title card */}
        <div className="flex flex-col items-center gap-8 px-12 max-w-full">
          {chapter.kicker && (
            <div
              className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-semibold"
              style={{
                opacity: kickerT,
                transform: `translate3d(0, ${(1 - kickerT) * 12}px, 0)`,
              }}
            >
              {chapter.kicker}
            </div>
          )}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-14 text-white w-full max-w-[54rem]">
            <div className="flex justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/better.svg"
                alt="Better"
                className="h-[clamp(1.5rem,3.2vw,2.5rem)] w-auto"
                style={{
                  filter: "invert(1) brightness(2)",
                  opacity: logosT,
                  transform: `translate3d(${(1 - logosT) * -24}px, 0, 0)`,
                }}
              />
            </div>
            <span
              aria-hidden
              className="flex items-center justify-center text-[clamp(1.5rem,3.5vw,2.75rem)] text-white/40 font-light leading-none h-[clamp(2rem,4.5vw,3.75rem)]"
              style={{
                opacity: logosT,
                transform: `scale(${0.7 + logosT * 0.3})`,
              }}
            >
              ×
            </span>
            <div className="flex justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/pearmill.svg"
                alt="Pearmill"
                className="h-[clamp(1.75rem,3.8vw,3.2rem)] w-auto"
                style={{
                  filter: "invert(1) brightness(2)",
                  opacity: logosT,
                  transform: `translate3d(${(1 - logosT) * 24}px, 0, 0)`,
                }}
              />
            </div>
          </div>
          <div
            className="h-[2px] bg-white/30"
            style={{
              width: `${barT * 96}px`,
              opacity: barT,
            }}
          />
          <div
            className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-semibold"
            style={{
              opacity: subT,
              transform: `translate3d(0, ${(1 - subT) * 10}px, 0)`,
            }}
          >
            A team effort. Roll credits.
          </div>
        </div>

        {/* Small breathing room between the subtitle and the first credit —
            the credits appear to sit right under the title card. */}
        <div className="h-[4vh]" />

        {/* Credits roll — small beat after the title card settles, then fades
            in under the subtitle before the whole column glides up. */}
        <div
          className="w-full max-w-[60rem] px-10 flex flex-col items-center"
          style={{ opacity: clamp01((reveal - 0.028) / 0.008) }}
        >
          <div className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-3 mb-14 w-full max-w-[54rem]">
            {CREDITS.map((c) => (
              <div key={c.name} className="contents">
                <div className="text-[0.8rem] uppercase tracking-[0.12em] font-bold text-white text-right whitespace-nowrap self-baseline">
                  {c.name}
                </div>
                <div className="text-white/60 text-[13px] italic leading-snug text-left self-baseline">
                  {c.line}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 my-10 items-center text-center">
            {SPEECH.map((line, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "italic text-white/70 text-[14px] leading-relaxed max-w-lg"
                    : "text-white/75 text-[14px] leading-relaxed max-w-lg"
                }
              >
                {line}
              </p>
            ))}
          </div>
          <div className="text-[11px] uppercase tracking-[0.4em] text-white/50 font-semibold mt-4 pb-[20vh]">
            — fin. 💚
          </div>
        </div>
      </div>

      {/* Final thank-you gif — centered, fades in as the roll finishes and
          stays on screen after everything else has scrolled off. */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        style={{ opacity: clamp01((scrollT - 0.7) / 0.1) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://media.giphy.com/media/Ql6WCH22Grmpi/giphy.gif"
          alt="thank you"
          className="rounded-2xl shadow-2xl max-w-[26rem] w-[70vw]"
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  DM panel — the mic-drop ending: black background, big text       */
/*  beside the competitor screenshot, all stays legible              */
/* ─────────────────────────────────────────────────────────────── */

function DmPanel({
  chapter,
  openness: o,
  local,
  reveal,
}: {
  chapter: Chapter;
  openness: number;
  local: number;
  reveal: number;
}) {
  void local;
  // `reveal` is a scroll-driven 0→1 that spans the DM's entry travel plus
  // ~95% of its dwell, so every beat lands while the panel is centered and
  // the horizontal track is effectively paused.
  const stage = (start: number, end: number) =>
    clamp01((reveal - start) / Math.max(0.001, end - start));

  const typing1 = stage(0.02, 0.07);
  // Wider message windows = slower, more readable character-by-character typing.
  const msg1 = stage(0.07, 0.32);
  const typing2 = stage(0.34, 0.40);
  const msg2 = stage(0.40, 0.66);
  // Beat of silence before "Us." lands.
  const us = stage(0.74, 0.82);
  // Another beat before "Thanks for asking." tags on.
  const thanks = stage(0.92, 1.0);

  return (
    <section
      className="relative flex-shrink-0 h-full flex items-center text-white overflow-hidden"
      style={{ backgroundColor: chapter.bg }}
      aria-label={chapter.title.replace(/\n/g, " ")}
    >
      {/* Left-edge fade in from the outro green so the transition is seamless */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: "55vw",
          background:
            "linear-gradient(90deg, #014737 0%, rgba(1,71,55,0) 100%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-14 pl-16 pr-40 py-12">
        {/* Beat 1 — setup (always visible, enters with openness only) */}
        <div
          className="flex-shrink-0 w-[26rem]"
          style={{ opacity: o, transform: `translate3d(0, ${(1 - o) * 30}px, 0)` }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] bg-white/5 text-white/70 border border-white/10 mb-5">
            {chapter.kicker}
          </div>
          <h2 className="font-semibold leading-[0.95] tracking-tight whitespace-pre-line text-[clamp(2.5rem,5vw,4.5rem)]">
            Then the competitor{"\n"}DM&rsquo;d us.
          </h2>
          <p className="mt-5 text-white/65 text-lg max-w-md">
            Just to be sure.
          </p>
        </div>

        {/* Beat 2 — animated chat transcript */}
        <div
          className="flex-shrink-0 relative w-[36rem] rounded-2xl border border-white/10 shadow-2xl bg-[#1c1c1e] p-6 pt-5"
          style={{ opacity: o }}
        >
          <div className="flex items-center justify-between text-xs text-white/50 mb-4">
            <span className="font-semibold text-white/70">Nicole Jennings</span>
            <span>Today 12:55 PM</span>
          </div>
          <div className="flex flex-col gap-3 min-h-[11rem]">
            <ChatBubble
              typingT={typing1}
              messageT={msg1}
              text="Ok which of you won better"
            />
            <ChatBubble
              typingT={typing2}
              messageT={msg2}
              text="To be clear just curious and congrats! Lol"
            />
          </div>
        </div>

        {/* Beat 3 — the mic-drop answer, types in after the messages land */}
        <div
          className="flex-shrink-0 flex flex-col items-start"
          style={{ opacity: o }}
        >
          <div
            className="text-[clamp(5rem,12vw,12rem)] font-semibold tracking-tight leading-[0.92] flex items-baseline"
            aria-label="Us."
          >
            <TypedText text="Us." reveal={us} showCaret />
          </div>
          <div
            className="mt-4 text-white/60 text-sm uppercase tracking-[0.3em]"
            style={{
              opacity: us > 0.8 ? (us - 0.8) / 0.2 : 0,
              transform: `translate3d(0, ${(1 - clamp01((us - 0.8) / 0.2)) * 10}px, 0)`,
            }}
          >
            Thanks for asking.
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({
  typingT,
  messageT,
  text,
}: {
  typingT: number;
  messageT: number;
  text: string;
}) {
  const showTyping = typingT > 0 && messageT < 0.05;
  const showMessage = messageT > 0;
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6b6bb0] flex items-center justify-center text-[11px] font-bold text-white"
        style={{
          opacity: typingT > 0 ? 1 : 0,
          transform: `scale(${typingT > 0 ? 1 : 0.7})`,
          transition: "opacity 150ms, transform 200ms",
        }}
      >
        NJ
      </div>
      <div className="flex flex-col gap-1 flex-1 min-h-[2rem]">
        {showTyping && (
          <div
            className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-2xl bg-[#3a3a3c] w-fit"
            style={{ opacity: clamp01(typingT * 2) }}
          >
            <span className="ecosystem-dot-1 w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="ecosystem-dot-2 w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="ecosystem-dot-3 w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        )}
        {showMessage && (
          <div
            className="inline-flex px-3.5 py-2 rounded-2xl bg-[#3a3a3c] text-white text-base w-fit max-w-full"
            style={{
              opacity: clamp01(messageT * 4),
              transform: `translate3d(0, ${(1 - clamp01(messageT * 4)) * 6}px, 0) scale(${0.96 + clamp01(messageT * 4) * 0.04})`,
              transformOrigin: "0% 100%",
            }}
          >
            <TypedText text={text} reveal={messageT} />
          </div>
        )}
      </div>
    </div>
  );
}

function TypedText({
  text,
  reveal,
  showCaret = false,
}: {
  text: string;
  reveal: number;
  showCaret?: boolean;
}) {
  const chars = Array.from(text);
  const nonSpace = chars.filter((c) => !/\s/.test(c)).length;
  const shown = Math.floor(clamp01(reveal) * nonSpace);
  let counted = 0;
  const caretShouldShow = showCaret && reveal > 0 && reveal < 1;
  return (
    <>
      {chars.map((c, i) => {
        if (/\s/.test(c)) return <span key={i}>{c === "\n" ? <br /> : "\u00a0"}</span>;
        const visible = counted++ < shown;
        return (
          <span key={i} style={{ opacity: visible ? 1 : 0 }}>
            {c}
          </span>
        );
      })}
      {caretShouldShow && (
        <span
          aria-hidden
          className="inline-block align-baseline ecosystem-caret"
          style={{
            width: "0.08em",
            height: "0.9em",
            marginLeft: "0.05em",
            backgroundColor: "currentColor",
            transform: "translateY(0.08em)",
          }}
        />
      )}
    </>
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
      style={{ backgroundColor: chapter.bg }}
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
            {chapter.slackQuote && <SlackQuote messages={chapter.slackQuote} />}
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

        {/* 2.5 · Dashboard MacBook mockup (optional) */}
        {chapter.dashboard && (
          <div className="flex-shrink-0">
            <DashboardMockup dashboard={chapter.dashboard} />
          </div>
        )}

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

        {/* 5 · Key learning — always opaque so it stays readable while
            scrolling; it's naturally revealed/hidden by horizontal position. */}
        {chapter.learning && (
          <div className="flex-shrink-0 w-[26rem]">
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

function DashboardMockup({
  dashboard,
}: {
  dashboard: NonNullable<Chapter["dashboard"]>;
}) {
  const { videoSrc, posterSrc, href, password, label } = dashboard;
  const hasVideo = !!videoSrc;
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onEnded = () => {
      timer = setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }, 8000);
    };
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 px-8 py-6">
      {/* MacBook body */}
      <div className="relative">
        {/* Screen */}
        <div className="relative bg-zinc-900 rounded-[12px] p-[6px] shadow-2xl ring-1 ring-black/10">
          {/* Notch */}
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-16 h-[5px] bg-black rounded-b-md z-10" />
          {/* Screen content */}
          <div className="relative w-[30rem] aspect-[16/10] overflow-hidden rounded-[5px] bg-white flex items-center justify-center p-3">
            {hasVideo ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                autoPlay
                muted
                playsInline
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            ) : posterSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterSrc}
                alt="Dashboard"
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            ) : (
              <div className="text-zinc-500 text-sm">
                Dashboard preview
              </div>
            )}
          </div>
        </div>
        {/* Hinge + base */}
        <div className="relative -mt-[1px] mx-auto h-[14px] w-[calc(100%+28px)] -translate-x-[14px] bg-gradient-to-b from-zinc-300 to-zinc-200 rounded-b-[16px] shadow-md">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[4px] bg-zinc-400/50 rounded-b-md" />
        </div>
      </div>

      {/* CTA button + password hint */}
      <div className="flex flex-col items-center gap-2">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#014737] text-white text-sm font-semibold shadow-md hover:bg-[#023a2d] transition-colors"
        >
          {label ?? "Open the dashboard"}
          <ArrowUpRight className="w-4 h-4" />
        </a>
        {password && (
          <div className="text-[11px] tracking-[0.2em] text-zinc-500 font-semibold">
            <span className="uppercase">password:</span>{" "}
            <span className="text-zinc-800 normal-case tracking-normal font-mono">{password}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SlackQuote({
  messages,
}: {
  messages: NonNullable<Chapter["slackQuote"]>;
}) {
  return (
    <div className="mt-5 flex flex-col gap-3 rounded-lg bg-white border border-zinc-200 shadow-sm px-5 py-4 max-w-[32rem]">
      {messages.map((m, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[14px] text-zinc-900">
              {m.author}
            </span>
            <span className="text-[11px] text-zinc-500">{m.time}</span>
          </div>
          <p className="text-[14px] leading-snug text-zinc-900 whitespace-pre-line">
            {m.boldPrefix && (
              <span className="font-bold">{m.boldPrefix} </span>
            )}
            {m.text}
          </p>
          {m.reactions.length > 0 && (
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {m.reactions.map((r, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] text-zinc-700"
                >
                  <span className="text-[13px] leading-none">{r.emoji}</span>
                  <span className="tabular-nums font-medium">{r.count}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LeadMedia({ src, caption }: { src: string; caption?: string }) {
  const isVideo = /\.(mp4|mov|webm)$/i.test(src);
  const cls =
    "w-44 h-44 md:w-52 md:h-52 rounded-2xl object-cover shadow-lg ring-1 ring-black/5";
  return (
    <figure className="flex flex-col items-center gap-2">
      {isVideo ? (
        <video src={src} autoPlay loop muted playsInline className={cls} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={caption ?? ""} loading="lazy" className={cls} />
      )}
      {caption && (
        <figcaption className="text-[11px] italic text-zinc-500 text-center max-w-[14rem] leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
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
      className="group relative flex-shrink-0 w-48 h-64 rounded-xl overflow-visible bg-zinc-100 cursor-zoom-in ring-1 ring-black/5 ecosystem-focus transition-transform duration-300 hover:scale-[1.35] hover:z-20 hover:shadow-2xl"
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
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
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
  onSeek,
}: {
  progress: number;
  activeIndex: number;
  total: number;
  onSeek: (fraction: number) => void;
}) {
  const railRef = useRef<HTMLButtonElement>(null);
  const seekFromEvent = (e: React.MouseEvent<HTMLElement>) => {
    const el = railRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const f = clamp01((e.clientX - rect.left) / rect.width);
    onSeek(f);
  };
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full shadow-md border border-white">
      <button
        ref={railRef}
        type="button"
        onClick={seekFromEvent}
        aria-label="Seek timeline"
        title="Click to jump"
        className="group relative h-4 w-48 flex items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#014737] rounded-full"
      >
        <div className="relative h-1.5 w-full rounded-full bg-zinc-200 overflow-hidden group-hover:h-2 transition-[height] duration-150">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100 ease-out"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, #09090b 0%, #014737 100%)",
            }}
          />
        </div>
      </button>
      <button
        type="button"
        onClick={() => onSeek(0)}
        aria-label="Back to start"
        title="Back to start"
        className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        ↺
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSeek(total > 1 ? i / (total - 1) : 0)}
            aria-label={`Jump to chapter ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:bg-zinc-700 ${
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

// Emotional arc — caps at 99.9% (never 100 until SOW is signed)
const ODDS = [0, 0, 40, 85, 30, 90, 15, 95, 97, 99.9, 99.9, 99.9];
const DAYS = [0, 0, 1, 48, 75, 125, 140, 202, 202, 202, 202, 202];

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
  const display = value >= 99 ? value.toFixed(1) : String(Math.round(value));
  const intPart = Math.round(value);
  const color =
    intPart >= 75 ? "#047857" : intPart >= 50 ? "#b45309" : "#b91c1c";
  return (
    <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2.5 bg-white/85 backdrop-blur px-4 py-2.5 rounded-full shadow-md border border-white">
      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold">
        odds we&rsquo;d win
      </span>
      <span
        className="text-2xl font-bold tabular-nums transition-colors duration-500"
        style={{ color }}
      >
        {display}%
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
