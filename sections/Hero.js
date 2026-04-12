import Image from "next/image";
import PromoBadge from "@/components/PromoBadge";
import SocialProof from "@/sections/SocialProof";

const MEMBER_AVATARS = [
  { name: "Membro 1", src: "/foto1.jpg" },
  { name: "Membro 2", src: "/foto2.jpg" },
  { name: "Membro 3", src: "/foto3.jpg" },
  { name: "Membro 4", src: "/foto4.jpg" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-svh items-center justify-center overflow-hidden bg-white px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-[-18%] h-[42vh] bg-[radial-gradient(ellipse_at_center,rgba(2,119,131,0.12)_0%,rgba(2,119,131,0.06)_30%,rgba(2,119,131,0.02)_50%,rgba(255,255,255,0)_72%)] blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-5 text-center sm:gap-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={112}
          height={32}
          className="h-auto w-28 sm:hidden"
          priority
        />

        <PromoBadge />

        <h1 className="title-reveal flex flex-col items-center justify-center text-[38px] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[57px] sm:leading-[1.15]">
          <span className="flex flex-wrap items-center justify-center gap-x-[0.22em] sm:flex-nowrap sm:gap-x-[0.28em]">
            <span className="title-word" style={{ animationDelay: "0.02s" }}>
              Começa
            </span>
            <span className="title-word" style={{ animationDelay: "0.08s" }}>
              a
            </span>
            <span className="title-word" style={{ animationDelay: "0.14s" }}>
              Fazer
            </span>
          </span>
          <span className="flex flex-wrap items-center justify-center gap-x-[0.22em] sm:flex-nowrap sm:gap-x-[0.28em]">
            <span className="title-word" style={{ animationDelay: "0.22s" }}>
              Dinheiro
            </span>
            <span className="title-word" style={{ animationDelay: "0.28s" }}>
              com
            </span>
            <span className="title-word" style={{ animationDelay: "0.34s" }}>
              Resell
            </span>
          </span>
        </h1>

        <p className="hidden max-w-[20rem] text-[13px] leading-relaxed text-slate-600 sm:block sm:max-w-xl sm:text-[14px]">
          Acede aos melhores fornecedores portugueses e aprende as táticas que te permitem transformar qualquer
          investimento em lucro — com o apoio de +1000 membros ativos.
        </p>

        <a
          href="#"
          className="group relative inline-flex h-[2.8em] w-full items-center justify-center overflow-hidden rounded-[0.9em] border-0 bg-brand py-[0.35em] pl-[1.05em] pr-[3.15em] text-[15px] font-medium tracking-[0.01em] text-white shadow-[inset_0_0_1.6em_-0.6em_rgba(1,95,104,0.95)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto sm:justify-start sm:pl-[1.2em] sm:pr-[3.3em] sm:text-[16px]"
        >
          <span className="text-white">Junta-te hoje</span>
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

        <section className="flex w-full items-center justify-start sm:hidden">
          <div className="flex w-full max-w-full items-center justify-start gap-2.5 overflow-hidden">
            <div className="flex items-center">
              {MEMBER_AVATARS.map((avatar, index) => (
                <div
                  key={avatar.name}
                  className="h-7 w-7 overflow-hidden rounded-full border-2 border-white"
                  style={index === 0 ? undefined : { marginLeft: "-10px" }}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[12px] font-semibold tracking-[0.01em] text-slate-900">200+</span>
              <span className="mt-1 text-[12px] font-normal tracking-[0.01em] text-slate-600">
                Faturam 4 dígitos mensais
              </span>
            </div>
          </div>
        </section>

        <div className="block w-screen max-w-none self-stretch pt-1 sm:hidden" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}>
          <SocialProof />
        </div>
      </div>
    </section>
  );
}
