"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Preciso de investir muito dinheiro para começar?",
    answer:
      "Não é necessário um grande investimento inicial, podendo começar com valores baixos e reinvestir os lucros à medida que vais evoluindo.",
  },
  {
    question: "O que está incluído na comunidade?",
    answer:
      "A comunidade inclui acesso a fornecedores portugueses, produtos vencedores já testados, um método passo a passo, estratégias atualizadas, apoio da comunidade e atualizações regulares.",
  },
  {
    question: "Os fornecedores são confiáveis?",
    answer:
      "Os fornecedores disponibilizados são testados ou utilizados dentro da própria comunidade, com o objetivo de reduzir erros e acelerar resultados.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim, poderás cancelar o acesso conforme as condições do plano escolhido, sem compromissos de longo prazo.",
  },
  {
    question: "Existe política de devolução?",
    answer:
      "Sim, existe uma garantia de 30 dias, na qual poderás solicitar a devolução de 100€ caso apliques o método e não consigas realizar a tua primeira venda dentro desse período.",
  },
];

export default function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState(null);

  function toggleQuestion(question) {
    setOpenQuestion((current) => (current === question ? null : question));
  }

  return (
    <section
      className="flex justify-center bg-white px-4 py-16 text-slate-950 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
      aria-label="Perguntas frequentes"
    >
      <div className="flex w-full max-w-[1320px] flex-col items-center text-center">
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.85rem",
            marginBottom: "40px",
          }}
        >
        <h2 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-[42px]" style={{ margin: 0 }}>
          Perguntas frequentes
        </h2>
        <p className="max-w-[34rem] text-center text-[14px] leading-[1.6] text-slate-600" style={{ margin: 0 }}>
          Tens dúvidas? Encontras aqui as respostas para as perguntas mais comuns.
        </p>
        </header>

        <div className="w-full text-left">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openQuestion === item.question;

            return (
              <div key={item.question} className="w-full">
                <div className="w-full py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => toggleQuestion(item.question)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 text-left text-[15px] font-semibold tracking-[-0.01em] text-slate-950 sm:gap-4 sm:text-[16px]"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center transition ${
                        isOpen ? "rotate-45 text-brand" : "text-slate-500"
                      }`}
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 5v14" strokeLinecap="round" />
                        <path d="M5 12h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div className={`faq-answer-shell ${isOpen ? "is-open" : ""}`}>
                    <div className="faq-answer-inner">
                      <p className="max-w-[64rem] pt-4 pr-2 text-[14px] leading-[1.7] text-slate-600 sm:pr-12">{item.answer}</p>
                    </div>
                  </div>
                </div>

                {index !== FAQ_ITEMS.length - 1 ? (
                  <div className="h-[4px]" aria-hidden="true">
                    <div className="mx-auto h-[2px] w-[calc(100%-6px)] rounded-full bg-[rgba(100,116,139,0.14)]" />
                    <div className="mx-auto h-[2px] w-[calc(100%-6px)] rounded-full bg-[rgba(0,0,0,0.16)]" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
