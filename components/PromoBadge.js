export default function PromoBadge() {
  return (
    <div className="relative inline-flex max-w-full rounded-full border border-slate-300 bg-white p-px shadow-[0_8px_24px_-20px_rgba(15,23,42,0.2)]">
      <div className="pointer-events-none absolute inset-x-7 -bottom-[4px] h-[8px] rounded-full bg-[linear-gradient(90deg,rgba(2,119,131,0)_0%,rgba(2,119,131,0.8)_50%,rgba(2,119,131,0)_100%)] opacity-70 blur-md" />

      <div className="relative inline-flex max-w-full items-center gap-1.5 rounded-full bg-white pl-[5px] pr-[9px] py-[5px] text-[12px] tracking-normal text-slate-700 sm:gap-2">
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full bg-white/80" />

        <span className="relative inline-flex shrink-0 items-center rounded-full bg-brand px-2.5 py-[6px] text-[12px] font-medium leading-none tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
          NOVO!
        </span>

        <span className="relative min-w-0 whitespace-nowrap text-left text-[12px] font-medium leading-none tracking-normal text-slate-700">
          {"C\u00d3DIGO "}<span className="font-semibold text-slate-900">&ldquo;RESELL20&rdquo;</span> PARA 20% DESCONTO
        </span>

        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="relative h-3.5 w-3.5 shrink-0 text-slate-700">
          <path
            d="M7.5 5.5L12 10l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
