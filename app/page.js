import Hero from "@/sections/Hero";
import FaqSection from "@/sections/FaqSection";
import GuaranteeSection from "@/sections/GuaranteeSection";
import HowItWorks from "@/sections/HowItWorks";
import PricingSection from "@/sections/PricingSection";
import SocialProof from "@/sections/SocialProof";

const MEMBER_AVATARS = [
  { name: "Membro 1", src: "/foto1.jpg" },
  { name: "Membro 2", src: "/foto2.jpg" },
  { name: "Membro 3", src: "/foto3.jpg" },
  { name: "Membro 4", src: "/foto4.jpg" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="hidden h-[40px] w-full items-center justify-center bg-brand px-4 sm:flex sm:px-6">
        <div className="flex max-w-full items-center gap-2.5 overflow-hidden">
          <div className="flex items-center">
            {MEMBER_AVATARS.map((avatar, index) => (
              <div
                key={avatar.name}
                className="h-7 w-7 overflow-hidden rounded-full border-2 border-brand shadow-[0_6px_18px_rgba(2,119,131,0.18)]"
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
          <p className="whitespace-nowrap text-[12px] tracking-[0.01em] text-white">
            <span className="font-semibold">200+</span>{" "}
            <span className="font-normal">Faturam 4 dígitos mensais</span>
          </p>
        </div>
      </section>
      <div className="hidden sm:block">
        <SocialProof />
      </div>
      <HowItWorks />
      <PricingSection />
      <FaqSection />
      <GuaranteeSection />
      <footer className="w-full bg-white pt-6 pb-3 sm:pt-8">
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
          <p className="absolute bottom-[12px] left-1/2 -translate-x-1/2 text-center text-[11px] font-medium tracking-[0.01em] text-black sm:bottom-[18px] sm:text-[14px]">
            {"\u00A9 2026 Katching"}
          </p>
        </div>
      </footer>
    </>
  );
}
