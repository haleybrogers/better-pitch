import { ArrowUpRight } from "lucide-react";

const PORTAL_URL = "https://better-portal-two.vercel.app/";

export function PortalDemo() {
  return (
    <section className="relative bg-white py-24 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] bg-[#014737]/5 text-[#014737] border border-[#014737]/15 mb-4">
          The dashboard she kissed
        </div>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[0.95] text-zinc-900 max-w-3xl">
          Live, in the room.
        </h2>
        <p className="mt-4 text-zinc-600 text-lg max-w-xl">
          The Vercel portal Haley walked Jessica through on April 20. Scroll,
          click, actually use it — same version that was in the room.
        </p>
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#014737] text-white text-sm font-semibold hover:bg-[#023827] transition-colors"
        >
          Open the full portal
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="px-6 md:px-12">
        <div className="relative max-w-6xl mx-auto aspect-[4/3] md:aspect-video rounded-xl overflow-hidden border border-zinc-200 shadow-xl bg-zinc-50">
          <iframe
            src={PORTAL_URL}
            title="Better × Pearmill creative strategy portal"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="max-w-6xl mx-auto mt-4 text-xs text-zinc-500 font-mono">
          better-portal-two.vercel.app · live
        </div>
      </div>
    </section>
  );
}
