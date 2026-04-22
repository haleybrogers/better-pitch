"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_SLIDES = 110;
const slides = Array.from({ length: TOTAL_SLIDES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return { index: i + 1, src: `/deck/slide-${n}.jpg` };
});

export function DeckStrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i == null ? null : Math.max(1, i - 1))),
    []
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i == null ? null : Math.min(TOTAL_SLIDES, i + 1))),
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
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] bg-[#014737]/5 text-[#014737] border border-[#014737]/15 mb-4">
          The actual deck
        </div>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[0.95] text-zinc-900 max-w-3xl">
          110 slides.
          <br />
          Click any to read it.
        </h2>
        <p className="mt-4 text-zinc-600 text-lg max-w-xl">
          The Pearmill × Better pitch deck — exported straight from the
          file that went into the room. Arrow keys to move, Esc to close.
        </p>
      </div>

      <div className="overflow-x-auto pb-8 px-6 md:px-12">
        <div className="flex gap-3 min-w-max">
          {slides.map((s) => (
            <button
              key={s.index}
              onClick={() => setOpenIndex(s.index)}
              className="group relative flex-shrink-0 w-64 aspect-video rounded-lg overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
              aria-label={`Open slide ${s.index}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={`Slide ${s.index}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[10px] font-mono bg-white/90 backdrop-blur px-1.5 py-0.5 rounded">
                {String(s.index).padStart(3, "0")} / {TOTAL_SLIDES}
              </span>
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

          {openIndex > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {openIndex < TOTAL_SLIDES && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/deck/slide-${String(openIndex).padStart(3, "0")}.jpg`}
            alt={`Slide ${openIndex}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-md shadow-2xl"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs font-mono bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
            {String(openIndex).padStart(3, "0")} / {TOTAL_SLIDES}
          </div>
        </div>
      )}
    </section>
  );
}
