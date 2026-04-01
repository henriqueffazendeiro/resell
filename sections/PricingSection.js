const PLANS = [
  {
    id: "annual",
    title: "PLANO ANUAL",
    description: "Acede ao nosso plano mais economico.",
    price: "168€/ANO",
    cta: "Comeca Agora",
    featured: true,
    badge: {
      type: "corner",
      eyebrow: "Aproveita o Desconto!",
      value: "40% OFF",
    },
  },
  {
    id: "excellence",
    title: "PLANO EXCELLENCE",
    description: "Acede ao plano exclusivo com acesso vitalicio e beneficios privados premium.",
    price: "498€/LIFETIME",
    cta: "Comeca Agora",
    featured: false,
    badge: {
      type: "side",
      value: "5",
      label: "Vagas Disponiveis",
    },
  },
];

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-teal-100">
      <path
        d="M12 2.75 4.75 5.5v5.96c0 4.5 2.79 8.68 7.03 10.54l.22.1.22-.1c4.24-1.86 7.03-6.04 7.03-10.54V5.5L12 2.75Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M12 3.75 5.75 6.12v5.34c0 4.08 2.47 7.86 6.25 9.58 3.78-1.72 6.25-5.5 6.25-9.58V6.12L12 3.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m9.35 12.15 1.77 1.77 3.53-3.79" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function PlanBadge({ badge, featured }) {
  if (badge.type === "corner") {
    return (
      <div className="absolute right-5 top-5 rounded-[18px] border border-teal-300/20 bg-teal-300/12 px-4 py-3 text-right shadow-[0_0_30px_rgba(2,119,131,0.2)] backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-100/72">{badge.eyebrow}</p>
        <p className={`mt-1 text-[20px] font-bold tracking-[-0.04em] ${featured ? "text-teal-100" : "text-white"}`}>{badge.value}</p>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center rounded-full border border-white/12 bg-white/8 px-3 py-4 text-center shadow-[0_0_30px_rgba(2,119,131,0.16)] backdrop-blur-xl">
      <span className="text-[28px] font-bold leading-none tracking-[-0.05em] text-white">{badge.value}</span>
      <span className="mt-2 max-w-[58px] text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.16em] text-slate-300">
        {badge.label}
      </span>
    </div>
  );
}

function PricingCard({ plan }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[30px] border p-7 text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-teal-200/28 hover:shadow-[0_28px_90px_rgba(2,119,131,0.24)] sm:p-8 ${
        plan.featured
          ? "min-h-[480px] border-teal-200/18 bg-[linear-gradient(160deg,rgba(2,16,20,0.98)_0%,rgba(2,49,55,0.96)_36%,rgba(2,119,131,0.9)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_100px_rgba(2,119,131,0.28)] lg:scale-[1.03]"
          : "min-h-[455px] border-white/10 bg-[linear-gradient(160deg,rgba(3,15,20,0.98)_0%,rgba(4,34,39,0.96)_44%,rgba(3,74,82,0.9)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_80px_rgba(3,27,31,0.42)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          plan.featured
            ? "bg-[radial-gradient(circle_at_top_left,rgba(94,234,212,0.24),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(2,119,131,0.24),transparent_42%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(94,234,212,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.18),transparent_40%)]"
        }`}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
      <div className="pointer-events-none absolute left-7 top-7 h-28 w-28 rounded-full bg-teal-300/10 blur-3xl" />

      <PlanBadge badge={plan.badge} featured={plan.featured} />

      <div className="relative flex h-full flex-col">
        <div className="max-w-[78%]">
          <p className={`text-[12px] font-semibold uppercase tracking-[0.28em] ${plan.featured ? "text-teal-100/78" : "text-slate-300"}`}>
            Membership
          </p>
          <h3 className="mt-5 text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[34px]">{plan.title}</h3>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-slate-300">{plan.description}</p>
        </div>

        <div className="mt-12">
          <p className={`text-[38px] font-bold tracking-[-0.06em] sm:text-[46px] ${plan.featured ? "text-teal-50" : "text-white"}`}>{plan.price}</p>
        </div>

        <div className="mt-auto pt-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          <a
            href="#"
            className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-[15px] font-semibold tracking-[0.02em] text-white transition-all duration-300 ${
              plan.featured
                ? "bg-[linear-gradient(135deg,#0d9488_0%,#027783_56%,#022c32_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_36px_rgba(2,119,131,0.45)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0_44px_rgba(45,212,191,0.4)]"
                : "bg-[linear-gradient(135deg,#0f766e_0%,#027783_58%,#022c32_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_30px_rgba(2,119,131,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_38px_rgba(13,148,136,0.34)]"
            } hover:scale-[1.01]`}
          >
            {plan.cta}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-[#031317] px-4 py-22 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.12),transparent_22%),radial-gradient(circle_at_15%_35%,rgba(2,119,131,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(20,184,166,0.14),transparent_24%),linear-gradient(180deg,#031317_0%,#062229_44%,#031317_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-teal-300/8 to-transparent blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-teal-100/70">Pricing</p>
          <h2 className="mt-5 text-[38px] font-semibold leading-none tracking-[-0.06em] text-white sm:text-[52px]">Planos de Preco</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slate-300">Escolhe o plano ideal para ti e comeca hoje!</p>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-[980px] grid-cols-1 justify-center gap-6 lg:grid-cols-2 lg:gap-8">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-8 w-full max-w-4xl rounded-[24px] border border-teal-300/12 bg-[linear-gradient(135deg,rgba(4,31,36,0.96),rgba(2,67,74,0.9))] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_45px_rgba(2,119,131,0.14)] backdrop-blur-xl sm:px-6">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-teal-200/16 bg-teal-300/10 shadow-[0_0_24px_rgba(2,119,131,0.18)]">
              <ShieldIcon />
            </div>
            <p className="text-[14px] leading-relaxed text-slate-200 sm:text-[15px]">
              Se nao fizeres uma trade bem sucedida durante 15 dias de acordo com os nossos termos damos-te 100% do dinheiro de volta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
