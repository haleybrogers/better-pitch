export function CompetitorDM() {
  return (
    <section className="relative bg-[#09090b] text-white py-24 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] bg-white/5 text-white/70 border border-white/10 mb-4">
          One more thing
        </div>
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-tight leading-[0.95] text-white max-w-3xl">
          Then the competitor
          <br />
          DM'd us.
        </h2>
        <p className="mt-4 text-white/60 text-lg max-w-xl">
          Just to be sure.
        </p>

        <div className="mt-12 relative max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1c1c1e]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/moments/competitor-dm.png"
            alt="DM from the competitor agency asking who won Better"
            className="w-full h-auto"
          />
        </div>

        <div className="mt-16 text-center">
          <div className="text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight leading-[0.95]">
            Us.
          </div>
          <div className="mt-4 text-white/50 text-sm uppercase tracking-[0.3em]">
            Thanks for asking.
          </div>
        </div>
      </div>
    </section>
  );
}
