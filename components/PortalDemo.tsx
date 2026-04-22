import { ArrowUpRight, ExternalLink } from "lucide-react";

const PORTAL_URL = "https://better-portal-two.vercel.app/";

export function PortalDemo() {
  return (
    <section className="relative bg-white py-24 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] bg-[#014737]/5 text-[#014737] border border-[#014737]/15 mb-4">
          The dashboard she kissed
        </div>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[0.95] text-zinc-900 max-w-3xl">
          Live, in the room.
        </h2>
        <p className="mt-4 text-zinc-600 text-lg max-w-xl">
          Haley walked Jessica through this on April 20 in NYC. Same version,
          live on Vercel. Click it open.
        </p>
      </div>

      <div className="px-6 md:px-12">
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block max-w-6xl mx-auto relative aspect-[16/9] rounded-xl overflow-hidden bg-[#014737] shadow-xl hover:shadow-2xl transition-shadow"
          aria-label="Open the Better × Pearmill portal in a new tab"
        >
          {/* Editorial backdrop */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/70 text-xs font-mono tracking-wider">
            <span className="uppercase">better-portal-two.vercel.app</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              live
            </span>
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <div className="text-white/60 text-xs uppercase tracking-[0.3em] mb-4">
              Creative strategy hub
            </div>
            <div className="text-white text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-tight">
              Better × Pearmill
            </div>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#014737] text-sm font-semibold group-hover:bg-zinc-100 transition-colors">
              Open the live portal
              <ExternalLink className="w-4 h-4" />
            </div>
            <div className="mt-4 text-white/50 text-xs">
              opens in a new tab
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute bottom-6 right-6 text-white/40 group-hover:text-white/80 transition-colors">
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </a>
      </div>
    </section>
  );
}
