import Hero from "@/sections/Hero";
import SocialProof from "@/sections/SocialProof";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="flex h-10 w-full items-center justify-center bg-brand px-4">
        <p className="text-center text-[13px] font-medium tracking-[0.01em] text-white">
          Acesso imediato aos fornecedores e a uma comunidade com +1000 membros ativos
        </p>
      </section>
      <SocialProof />
    </>
  );
}
