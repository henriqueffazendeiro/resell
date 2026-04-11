export default function GuaranteeSection() {
  return (
    <section className="flex justify-center bg-white px-4 pb-20 text-slate-950 sm:px-6 lg:px-8 lg:pb-28">
      <div className="w-full max-w-[1320px]">
        <div className="relative flex w-full flex-col items-center gap-5 overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfb_100%)] px-6 py-12 text-center shadow-[0_16px_60px_rgba(2,119,131,0.08)] sm:gap-6 sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute left-[-192px] top-[-30px] z-10 w-[480px] -rotate-[48deg] overflow-hidden bg-brand py-4">
            <div className="guarantee-ribbon-marquee">
              <div className="guarantee-ribbon-track">
                <div className="guarantee-ribbon-group" aria-hidden="true">
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                </div>
                <div className="guarantee-ribbon-group" aria-hidden="true">
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                  <span className="guarantee-ribbon-copy">GARANTIA</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-[24px] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-950">
            Garantia de 30 dias
          </h2>

          <p className="text-[44px] font-bold leading-[1.08] tracking-[-0.04em] text-brand">
            100€ + REEMBOLSO
          </p>

          <p className="max-w-[42rem] text-[14px] leading-[1.8] text-slate-600 sm:text-[15px]">
            Se aplicares o método e não obtiveres 100€ faturados nos primeiros 30 dias, podes pedir 100€ + REEMBOLSO,
            sem complicações nem letra pequena.
          </p>

          <a
            href="#"
            className="group relative inline-flex h-[2.8em] items-center overflow-hidden rounded-[0.9em] border-0 bg-brand py-[0.35em] pl-[1.2em] pr-[3.3em] text-[16px] font-medium tracking-[0.01em] text-white shadow-[inset_0_0_1.6em_-0.6em_rgba(1,95,104,0.95)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span className="text-white">Começar agora</span>
            <span className="absolute right-[0.3em] flex h-[2.2em] w-[2.2em] items-center justify-center rounded-[0.7em] bg-white text-brand shadow-[0.1em_0.1em_0.6em_0.2em_rgba(2,119,131,0.28)] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] group-active:scale-95">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-[1.1em] transition-transform duration-300 group-hover:translate-x-[0.1em]"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
              </svg>
            </span>
          </a>
        </div>
      </div>

    </section>
  );
}
