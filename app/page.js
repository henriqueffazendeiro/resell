import Hero from "@/sections/Hero";
import LaurelWreath from "@/components/LaurelWreath";
import FaqSection from "@/sections/FaqSection";
import GuaranteeSection from "@/sections/GuaranteeSection";
import HowItWorks from "@/sections/HowItWorks";
import PricingSection from "@/sections/PricingSection";
import SocialProof from "@/sections/SocialProof";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="flex h-[40px] w-full items-center justify-center bg-brand px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <LaurelWreath side="left" className="h-6 w-6 text-slate-200" />
          <p className="text-center text-[13px] font-medium tracking-[0.01em] text-white">
            MAIS DE 200 TESTEMUNHOS
          </p>
          <LaurelWreath side="right" className="h-6 w-6 text-slate-200" />
        </div>
      </section>
      <SocialProof />
      <HowItWorks />
      <PricingSection />
      <FaqSection />
      <GuaranteeSection />
      <footer className="w-full bg-white pt-8 pb-3">
        <div className="relative w-full overflow-hidden">
          <svg viewBox="0 0 1000 170" aria-hidden="true" className="block h-auto w-full">
            <defs>
              <linearGradient id="footer-word-gradient" x1="0" y1="170" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="12%" stopColor="#f6fbfb" stopOpacity="0.28" />
                <stop offset="26%" stopColor="#dceff0" stopOpacity="0.62" />
                <stop offset="48%" stopColor="#6fbcc2" stopOpacity="0.9" />
                <stop offset="72%" stopColor="#1f8d97" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#027783" stopOpacity="1" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="138"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#footer-word-gradient)"
              style={{ fontFamily: "var(--font-sans)", fontSize: "170px", fontWeight: 800 }}
            >
              KATCHING
            </text>
          </svg>
          <p className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-center text-[14px] font-medium tracking-[0.01em] text-black">
            {"\u00A9 2026 Katching"}
          </p>
        </div>
      </footer>
    </>
  );
}
