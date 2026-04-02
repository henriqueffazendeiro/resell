"use client";

import { useState } from "react";

const STEPS = [
  {
    id: "community",
    stepNumber: "01",
    title: "Comunidade",
    description:
      "Entra na comunidade e aprende com pessoas que ja vendem todos os dias. Descobre estrategias, erros a evitar e oportunidades reais no mercado.",
    image: "/comunidade.jpg",
  },
  {
    id: "products",
    stepNumber: "02",
    title: "Produtos",
    description:
      "Aprende a identificar produtos com potencial de revenda, procura elevada e margem interessante para comecares com mais seguranca.",
    image: "/produto.jpg",
  },
  {
    id: "supplier",
    stepNumber: "03",
    title: "Fornecedor",
    description:
      "Descobre onde encontrar fornecedores e como escolher opcoes fiaveis para comprares melhor e protegeres a tua margem.",
    image: "/fornecedor.avif",
  },
  {
    id: "sales",
    stepNumber: "04",
    title: "Venda",
    description:
      "Percebe como anunciar, posicionar e vender de forma mais eficaz para transformares o teu investimento em lucro.",
    image: "/venda.jpg",
  },
];

function StepCard({ step, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-[14px] border px-5 py-3.5 text-left transition-all duration-300 ${
        isActive
          ? "border-slate-200 bg-white text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
          : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-slate-100"
      }`}
      aria-pressed={isActive}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-[14px] font-semibold tracking-[0.08em] ${
          isActive ? "border-slate-200 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-700"
        }`}
      >
        {step.stepNumber}
      </span>

      <span className="min-w-0 flex-1">
        <span className={`block text-[18px] font-semibold tracking-[0.01em] ${isActive ? "text-slate-950" : "text-slate-900"}`}>
          {step.title}
        </span>
      </span>

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
          isActive
            ? "border-slate-200 bg-slate-100 text-slate-900"
            : "border-slate-200 bg-white text-slate-500 group-hover:translate-x-0.5"
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 12h10" strokeLinecap="round" />
          <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

export default function HowItWorks() {
  const [activeStepId, setActiveStepId] = useState(STEPS[0].id);
  const activeStep = STEPS.find((step) => step.id === activeStepId) ?? STEPS[0];

  return (
    <section className="flex justify-center bg-white px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div className="flex flex-col justify-between">
          <div className="max-w-xl">
            <h2 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-[42px]">
              Como Funciona
            </h2>
            <p className="mt-8 text-[14px] font-bold text-slate-950">
              {activeStep.title}
            </p>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-slate-600">
              {activeStep.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {STEPS.map((step) => (
              <StepCard key={step.id} step={step} isActive={step.id === activeStep.id} onClick={() => setActiveStepId(step.id)} />
            ))}
          </div>
        </div>

        <div className="relative flex flex-col">
          <div
            key={activeStep.id}
            className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-cover bg-center transition-all duration-500 ease-out motion-safe:animate-[fade-in_500ms_ease-out] lg:aspect-[16/9]"
            style={{ backgroundImage: `url("${activeStep.image}")` }}
          />
        </div>
      </div>
    </section>
  );
}
