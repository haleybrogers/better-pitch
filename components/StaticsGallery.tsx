"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Static = { src: string; alt: string; caption: string };

const statics: Static[] = [
  {
    src: "/moments/statics/cake-creative.png",
    alt: "Cut the small talk cake ad",
    caption: "Cut the small talk out of your mortgage process.",
  },
  {
    src: "/moments/cake.jpg",
    alt: "The actual cake we brought",
    caption: "…so we baked the ad. Uber-couriered to 1 WTC, 12:45pm.",
  },
  {
    src: "/moments/statics/melanoma.png",
    alt: "Melanoma bus stop ad",
    caption: "If AI can find your melanoma, it can handle your pre-approval.",
  },
  {
    src: "/moments/statics/cortisol-shirt.png",
    alt: "Cortisol t-shirt ad",
    caption: "Getting a mortgage shouldn't spike your cortisol.",
  },
  {
    src: "/moments/statics/mansplaining.png",
    alt: "Mortgages without the mansplaining",
    caption: "Mortgages without the mansplaining.",
  },
  {
    src: "/moments/statics/hotel-key.png",
    alt: "Hotel key tag ad",
    caption: "1 in 5 mortgage denials happen because of missing or incorrect info.",
  },
  {
    src: "/moments/statics/coffee-cup.png",
    alt: "Coffee cup ad",
    caption: "If you mobile order inside the store, this mortgage is for you.",
  },
  {
    src: "/moments/statics/apple-watch.png",
    alt: "Apple watch ad",
    caption: "Better's AI keeps the mortgage process steady when your heart rate isn't.",
  },
];

export function StaticsGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i == null ? null : Math.max(0, i - 1))),
    []
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i == null ? null : Math.min(statics.length - 1, i + 1)
      ),
    []
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
    <section className="relative bg-white py-24 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] bg-[#014737]/5 text-[#014737] border border-[#014737]/15 mb-4">
          Round 2 · the work
        </div>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[0.95] text-zinc-900 max-w-3xl">
          What we brought into the room.
        </h2>
        <p className="mt-4 text-zinc-600 text-lg max-w-xl">
          Eight creative concepts for Better's first pitch — plus the cake
          itself. Click any to see it full size.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {statics.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
              aria-label={`Open ${s.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </button>
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
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {openIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {openIndex < statics.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={statics[openIndex].src}
            alt={statics[openIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] rounded-md shadow-2xl"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-xl px-4 text-center">
            <div className="text-white text-sm md:text-base">
              {statics[openIndex].caption}
            </div>
            <div className="mt-1 text-white/50 text-xs font-mono">
              {String(openIndex + 1).padStart(2, "0")} /{" "}
              {String(statics.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
