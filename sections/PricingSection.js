"use client";

import { useEffect, useRef, useState } from "react";

const TESTED_PRODUCTS_TOP = [
  { name: "Golden Goose", src: "/teste.jpg", investment: "35.00€", sale: "135.00€", profit: "+100.00€" },
  { name: "Casaco Burberry", src: "/teste.jpg", investment: "45.00€", sale: "100.00€", profit: "+55.00€" },
  { name: "Cachecol Burberry", src: "/teste.jpg", investment: "28.00€", sale: "90.00€", profit: "+62.00€" },
];

const TESTED_PRODUCTS_BOTTOM = [
  { name: "Mala Jacquemus", src: "/teste.jpg", investment: "39.00€", sale: "85.00€", profit: "+46.00€" },
  { name: "Anel Pandora", src: "/teste.jpg", investment: "11.00€", sale: "30.00€", profit: "+19.00€" },
  { name: "Produto Premium", src: "/teste.jpg", investment: "33.00€", sale: "100.00€", profit: "+67.00€" },
];

function PricingCardArtwork({ variant, title, description, price, badgeColor, badgeTitle, badgeValue }) {
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(560);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      setCardWidth(entry.contentRect.width);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const width = Math.max(cardWidth, 320);
  const height = 350;
  const radius = 18;
  const isMobile = cardWidth < 640;
  const plateWidth = Math.min(Math.max(width * 0.39, 150), width - 120);
  const plateX = (width - plateWidth) / 2;
  const holeCenter = width / 2;
  const holePath = `
    M${holeCenter - 38} 49
    C${holeCenter - 38} 42.925 ${holeCenter - 33.075} 38 ${holeCenter - 27} 38
    H${holeCenter - 19}
    C${holeCenter - 15.5} 38 ${holeCenter - 14} 36.8 ${holeCenter - 13} 34.6
    C${holeCenter - 11.1} 28.1 ${holeCenter - 6.3} 22 ${holeCenter} 22
    C${holeCenter + 6.3} 22 ${holeCenter + 11.1} 28.1 ${holeCenter + 13} 34.6
    C${holeCenter + 14} 36.8 ${holeCenter + 15.5} 38 ${holeCenter + 19} 38
    H${holeCenter + 27}
    C${holeCenter + 33.075} 38 ${holeCenter + 38} 42.925 ${holeCenter + 38} 49
    C${holeCenter + 38} 55.075 ${holeCenter + 33.075} 60 ${holeCenter + 27} 60
    H${holeCenter - 27}
    C${holeCenter - 33.075} 60 ${holeCenter - 38} 55.075 ${holeCenter - 38} 49
    Z
  `;

  return (
    <div
      ref={containerRef}
      className="pricing-card"
      aria-hidden={title ? undefined : "true"}
      style={{
        position: "relative",
        height: "350px",
        width: isMobile ? "100%" : "clamp(560px, 48vw, 760px)",
        flex: "0 1 auto",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="presentation"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id={`pricing-card-gradient-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="24%" stopColor="#d8f0f1" />
            <stop offset="48%" stopColor="#8bc7cb" />
            <stop offset="74%" stopColor="#2f98a0" />
            <stop offset="100%" stopColor="#027783" />
          </linearGradient>
          <linearGradient id={`pricing-card-depth-${variant}`} x1="12%" y1="88%" x2="88%" y2="12%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="36%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="62%" stopColor="rgba(2, 119, 131, 0.09)" />
            <stop offset="100%" stopColor="rgba(1, 63, 69, 0.18)" />
          </linearGradient>
          <radialGradient id={`pricing-card-top-light-${variant}`} cx="50%" cy="8%" r="52%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.42)" />
            <stop offset="34%" stopColor="rgba(255, 255, 255, 0.18)" />
            <stop offset="72%" stopColor="rgba(255, 255, 255, 0.03)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          <radialGradient id={`pricing-card-bottom-cloud-${variant}`} cx="18%" cy="82%" r="58%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
            <stop offset="48%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          <linearGradient id={`pricing-card-mark-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(1, 84, 92, 0.34)" />
            <stop offset="36%" stopColor="rgba(2, 119, 131, 0.28)" />
            <stop offset="72%" stopColor="rgba(216, 240, 241, 0.22)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
          </linearGradient>
          <pattern id={`pricing-card-speckles-${variant}`} patternUnits="userSpaceOnUse" width="84" height="84">
            <circle cx="14" cy="18" r="1.6" fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="39" cy="22" r="1.2" fill="rgba(255, 255, 255, 0.08)" />
            <circle cx="61" cy="14" r="1.8" fill="rgba(2, 119, 131, 0.08)" />
            <circle cx="70" cy="43" r="1.4" fill="rgba(255, 255, 255, 0.09)" />
            <circle cx="24" cy="58" r="1.3" fill="rgba(2, 119, 131, 0.07)" />
            <circle cx="48" cy="67" r="1.7" fill="rgba(255, 255, 255, 0.08)" />
            <circle cx="10" cy="74" r="1.1" fill="rgba(2, 119, 131, 0.06)" />
          </pattern>
          <radialGradient id={`pricing-hole-top-right-shadow-${variant}`} cx="72%" cy="30%" r="22%">
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.16)" />
            <stop offset="52%" stopColor="rgba(15, 23, 42, 0.065)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
          </radialGradient>
          <filter id={`pricing-card-pigment-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="1.35" numOctaves="4" seed="13" stitchTiles="stitch" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.13 0"
              result="grain"
            />
            <feBlend in="SourceGraphic" in2="grain" mode="multiply" result="textured" />
            <feComponentTransfer in="textured">
              <feFuncR type="gamma" amplitude="1" exponent="0.9" offset="0" />
              <feFuncG type="gamma" amplitude="1" exponent="0.9" offset="0" />
              <feFuncB type="gamma" amplitude="1" exponent="0.9" offset="0" />
            </feComponentTransfer>
          </filter>
          <clipPath id={`pricing-hole-clip-${variant}`}>
            <path d={holePath} />
          </clipPath>
          <mask id={`pricing-card-mask-${variant}`}>
            <rect width={width} height={height} rx={radius} fill="white" />
            <rect x={plateX} y="0" width={plateWidth} height="92" rx={radius} fill="white" />
            <path d={holePath} fill="black" />
          </mask>
        </defs>

        <rect width={width} height={height} rx={radius} fill={`url(#pricing-card-gradient-${variant})`} mask={`url(#pricing-card-mask-${variant})`} filter={`url(#pricing-card-pigment-${variant})`} />
        <rect width={width} height={height} rx={radius} fill={`url(#pricing-card-depth-${variant})`} mask={`url(#pricing-card-mask-${variant})`} opacity="0.95" />
        <rect width={width} height={height} rx={radius} fill={`url(#pricing-card-bottom-cloud-${variant})`} mask={`url(#pricing-card-mask-${variant})`} opacity="0.82" />
        <rect width={width} height={height} rx={radius} fill={`url(#pricing-card-top-light-${variant})`} mask={`url(#pricing-card-mask-${variant})`} opacity="0.9" />
        <rect width={width} height={height} rx={radius} fill={`url(#pricing-card-speckles-${variant})`} mask={`url(#pricing-card-mask-${variant})`} opacity="0.65" />
        <rect x="0.5" y="0.5" width={width - 1} height={height - 1} rx="17.5" fill="none" stroke="rgba(233, 247, 247, 0.72)" strokeWidth="1" mask={`url(#pricing-card-mask-${variant})`} />
        <rect x="1" y="1" width={width - 2} height={height - 2} rx="17" fill="none" stroke="rgba(2, 119, 131, 0.16)" strokeWidth="1" mask={`url(#pricing-card-mask-${variant})`} />
        <g mask={`url(#pricing-card-mask-${variant})`} opacity="0.52">
          <text x={width * 0.84} y="190" fill={`url(#pricing-card-mark-${variant})`} fontSize="360" fontWeight="800" fontFamily="Poppins, sans-serif" textAnchor="middle" transform={`rotate(-36 ${width * 0.84} 190)`}>
            K
          </text>
        </g>
        <g clipPath={`url(#pricing-hole-clip-${variant})`}>
          <ellipse cx={holeCenter + 14} cy="39" rx="11" ry="7" fill={`url(#pricing-hole-top-right-shadow-${variant})`} transform={`rotate(-28 ${holeCenter + 14} 39)`} />
        </g>
        <path d={holePath} fill="none" stroke="rgba(100, 116, 139, 0.42)" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" />
      </svg>

      {badgeColor ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "1.55rem",
              right: "-0.6rem",
              width: "150px",
              height: "44px",
              backgroundColor: badgeColor,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 9px 50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingLeft: "14px",
              paddingRight: "12px",
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                lineHeight: 1.1,
                fontWeight: 700,
                color: "#875000",
              }}
            >
              {badgeTitle}
            </span>
            <span
              style={{
                marginTop: "1px",
                fontSize: "14px",
                lineHeight: 1,
                fontWeight: 800,
                color: "#875000",
              }}
            >
              {badgeValue}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              top: "calc(1.55rem + 44px)",
              right: "-0.6rem",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "10px 10px 0 0",
              borderColor: "#875000 transparent transparent transparent",
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}

      {title ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "4.75rem 2rem 2rem",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: "24rem", color: "#06202b" }}>
            <p
              style={{
                margin: 0,
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#06202b",
              }}
            >
              {title}
            </p>
            <p
              style={{
                margin: "0.6rem 0 0",
                fontSize: "14px",
                lineHeight: 1.5,
                fontWeight: 500,
                color: "rgba(6, 32, 43, 0.78)",
              }}
            >
              {description}
            </p>
          </div>

          <div
            style={{
              marginTop: "auto",
              width: "100%",
              color: "#06202b",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "30px",
                lineHeight: 1,
                fontWeight: 700,
                color: "rgba(6, 32, 43, 0.84)",
              }}
            >
              {price}
            </p>
            <div
              style={{
                marginTop: "1.1rem",
                width: "100%",
                height: "4px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.22)",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  display: "block",
                  backgroundColor: "rgba(100, 116, 139, 0.22)",
                }}
              />
            </div>
            <a
              href="#"
              className="group relative inline-flex h-[2.8em] w-full items-center overflow-hidden rounded-[0.9em] border-0 bg-brand py-[0.35em] pl-[1.2em] pr-[3.3em] text-[16px] font-medium tracking-[0.01em] text-white shadow-[inset_0_0_1.6em_-0.6em_rgba(1,95,104,0.95)]"
              style={{
                marginTop: "1.25rem",
                textDecoration: "none",
                pointerEvents: "auto",
              }}
            >
              <span className="text-white">Começa Agora</span>
              <span
                className="absolute right-[0.3em] flex h-[2.2em] w-[2.2em] items-center justify-center rounded-[0.7em] bg-white text-brand shadow-[0.1em_0.1em_0.6em_0.2em_rgba(2,119,131,0.28)] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] group-active:scale-95"
              >
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
      ) : null}
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="pricing-section" aria-label="Pricing">
      <div className="pricing-shell">
        <header className="pricing-header">
          <h2>Planos de preco</h2>
          <p>Escolhe o plano ideal para ti e comeca hoje!</p>
        </header>

        <div className="pricing-grid">
          <PricingCardArtwork
            variant="a"
            title="PLANO MENSAL"
            description="Por menos de um cafe por dia."
            price="9,99€/MÊS"
          />
          <PricingCardArtwork
            variant="b"
            title="PLANO EXCELLENCE"
            description="Acede ao plano exclusivo com acesso vitalicio e beneficios privados premium."
            price="50€/LIFETIME"
            badgeColor="#ff9900"
            badgeTitle="Aproveita o Desconto!"
            badgeValue="50% OFF"
          />
        </div>

        <div className="community-wins">
          <header className="community-wins-header">
            <div className="community-wins-title">
              <h2>Produtos testados</h2>
              <img src="/vinted-icon.png" alt="Vinted" className="community-wins-icon" />
            </div>
            <p>Produtos validados para te ajudar a avancar com mais confianca e mais velocidade.</p>
          </header>

          <div className="product-marquee-shell">
            <div className="product-marquee fade-mask">
              <div className="product-track product-track-top">
                {[...TESTED_PRODUCTS_TOP, ...TESTED_PRODUCTS_TOP].map((item, index) => (
                  <article key={`${item.name}-top-${index}`} className="product-card">
                    <div className="product-card-image" role="img" aria-label={item.name} style={{ backgroundImage: `url("${item.src}")` }} />
                    <div className="product-card-body">
                      <div className="product-card-panel">
                        <p className="product-card-title">{item.name}</p>
                        <div className="product-metrics">
                          <div className="product-metric product-metric-investment">
                            <span>Investimento</span>
                            <strong>{item.investment}</strong>
                          </div>
                          <div className="product-metric">
                            <span>Valor de venda</span>
                            <strong>{item.sale}</strong>
                          </div>
                          <div className="product-metric product-metric-profit">
                            <span>Profit</span>
                            <strong>{item.profit}</strong>
                          </div>
                        </div>
                        <div className="product-sold-badge">Vendido</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="product-marquee fade-mask">
              <div className="product-track product-track-bottom">
                {[...TESTED_PRODUCTS_BOTTOM, ...TESTED_PRODUCTS_BOTTOM].map((item, index) => (
                  <article key={`${item.name}-bottom-${index}`} className="product-card">
                    <div className="product-card-image" role="img" aria-label={item.name} style={{ backgroundImage: `url("${item.src}")` }} />
                    <div className="product-card-body">
                      <div className="product-card-panel">
                        <p className="product-card-title">{item.name}</p>
                        <div className="product-metrics">
                          <div className="product-metric product-metric-investment">
                            <span>Investimento</span>
                            <strong>{item.investment}</strong>
                          </div>
                          <div className="product-metric">
                            <span>Valor de venda</span>
                            <strong>{item.sale}</strong>
                          </div>
                          <div className="product-metric product-metric-profit">
                            <span>Profit</span>
                            <strong>{item.profit}</strong>
                          </div>
                        </div>
                        <div className="product-sold-badge">Vendido</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          display: flex;
          justify-content: center;
          padding: 4.75rem 1rem;
          background: #ffffff;
        }

        .pricing-shell {
          width: 100%;
        }

        .pricing-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .pricing-header h2 {
          margin: 0;
          color: rgb(2 6 23);
          font-size: 30px;
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .pricing-header p {
          margin: 0.85rem auto 0;
          max-width: 34rem;
          color: rgba(15, 23, 42, 0.7);
          font-size: 14px;
          line-height: 1.6;
        }

        .pricing-grid {
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .community-wins {
          width: 100%;
          max-width: 1100px;
          margin: 4rem auto 0;
        }

        .community-wins-header {
          margin: 0 auto 2rem;
          text-align: center;
        }

        .community-wins-title {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .community-wins-header h2 {
          margin: 0;
          color: rgb(2 6 23);
          font-size: 30px;
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .community-wins-icon {
          width: 34px;
          height: 34px;
          object-fit: contain;
          flex: 0 0 auto;
        }

        .community-wins-header p {
          margin: 0.85rem auto 0;
          max-width: 34rem;
          color: rgba(15, 23, 42, 0.7);
          font-size: 14px;
          line-height: 1.6;
        }

        .product-marquee-shell {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .product-marquee {
          overflow: hidden;
          width: 100%;
        }

        .fade-mask {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .product-track {
          display: flex;
          width: max-content;
          gap: 1rem;
        }

        .product-track-top {
          animation: marquee-left-to-right 24s linear infinite;
        }

        .product-track-bottom {
          animation: marquee-right-to-left 24s linear infinite;
        }

        .product-card {
          position: relative;
          flex: 0 0 290px;
          min-height: 370px;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          background: #dbe7ea;
        }

        .product-card-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .product-card-body {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .product-card-panel {
          position: relative;
          overflow: hidden;
          padding: 1rem 1rem 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.12));
          border-top: 1px solid rgba(255, 255, 255, 0.26);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
        }

        .product-card-title {
          margin: 0 0 0.85rem;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.3;
        }

        .product-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .product-metric {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.22);
        }

        .product-metric span {
          color: rgba(255, 255, 255, 0.76);
          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;
        }

        .product-metric strong {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .product-metric:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .product-metric-profit strong {
          color: #d4fff6;
        }

        .product-metric-investment strong {
          color: #f3a3a3;
        }

        .product-sold-badge {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: -1rem;
          margin-left: -1rem;
          padding: 0.6rem 1rem;
          background: #2bb673;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        @keyframes marquee-left-to-right {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @keyframes marquee-right-to-left {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .pricing-card {
            width: 100% !important;
            height: 320px !important;
          }

          .pricing-header {
            margin-bottom: 2rem;
          }

          .pricing-grid {
            width: 100%;
            gap: 1.25rem;
          }

          .product-card {
            flex-basis: 250px;
            min-height: 330px;
          }

          .product-card-body {
          }

          .product-card-panel {
            padding: 0.85rem 0.85rem 0;
          }

          .product-sold-badge {
            margin-right: -0.85rem;
            margin-left: -0.85rem;
          }

          .product-metrics {
            gap: 0.45rem;
          }

          .product-metric {
            padding-bottom: 0.4rem;
          }

          .product-metric strong {
            font-size: 12px;
          }
        }

        @media (min-width: 640px) {
          .pricing-section {
            padding: 7rem 1.5rem;
          }

          .pricing-header {
            margin-bottom: 2.5rem;
          }

          .pricing-header h2 {
            font-size: 42px;
          }

          .pricing-grid {
            gap: 1.5rem;
            flex-wrap: nowrap;
          }

          .community-wins-header h2 {
            font-size: 42px;
          }

          .community-wins-icon {
            width: 42px;
            height: 42px;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .community-wins {
            margin-top: 5rem;
          }
        }

        @media (min-width: 1024px) {
          .community-wins {
            margin-top: 7rem;
          }
        }
      `}</style>
    </section>
  );
}
