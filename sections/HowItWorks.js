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
          ? "text-white shadow-none"
          : "border-slate-300 bg-slate-200 text-slate-900 hover:border-slate-400 hover:bg-slate-300"
      }`}
      style={{
        backgroundColor: isActive ? "#027783" : "#f8fafc",
        borderColor: isActive ? "#027783" : "#e5e7eb",
      }}
      aria-pressed={isActive}
    >
      <span
        className={`shrink-0 text-[14px] font-semibold tracking-[0.08em] ${
          isActive ? "text-white" : "text-slate-700"
        }`}
      >
        {step.stepNumber}
      </span>

      <span className="min-w-0 flex-1">
        <span className={`block text-[18px] font-semibold tracking-[0.01em] ${isActive ? "text-white" : "text-slate-900"}`}>
          {step.title}
        </span>
      </span>

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
          isActive
            ? "border-white bg-white text-brand"
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
    <section className="flex justify-center bg-white px-4 py-16 text-slate-950 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div className="flex flex-col gap-6 lg:justify-between lg:gap-0">
          <div className="max-w-xl">
            <h2 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-[42px]">
              Como Funciona
            </h2>
            <p className="mt-6 text-[14px] font-bold text-slate-950 sm:mt-6">
              {activeStep.title}
            </p>
            <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-slate-600 sm:mt-2">
              {activeStep.description}
            </p>
          </div>

          <div className="relative flex flex-col lg:hidden">
            <div
              key={`${activeStep.id}-mobile`}
              className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-cover bg-center transition-all duration-500 ease-out motion-safe:animate-[fade-in_500ms_ease-out]"
              style={{ backgroundImage: `url("${activeStep.image}")` }}
            />
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:mt-8">
            {STEPS.map((step) => (
              <StepCard key={step.id} step={step} isActive={step.id === activeStep.id} onClick={() => setActiveStepId(step.id)} />
            ))}
          </div>
        </div>

        <div className="relative hidden flex-col lg:flex">
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
