"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "@/components/ui/container";

const SCALE_STEPS = [1, 0.96, 0.92];
const OPACITY_STEPS = [1, 0.96, 0.9];

function createPosterDataUri(name, accentColor, baseColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${baseColor}" />
          <stop offset="52%" stop-color="${accentColor}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="16%" r="38%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.58)" />
          <stop offset="28%" stop-color="rgba(255,255,255,0.16)" />
          <stop offset="60%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(15,23,42,0.03)" />
          <stop offset="65%" stop-color="rgba(15,23,42,0.18)" />
          <stop offset="100%" stop-color="rgba(2,6,23,0.88)" />
        </linearGradient>
      </defs>
      <rect width="720" height="1280" rx="56" fill="url(#bg)" />
      <rect width="720" height="1280" rx="56" fill="url(#glow)" />
      <rect width="720" height="1280" rx="56" fill="url(#shade)" />
      <circle cx="360" cy="458" r="138" fill="rgba(255,255,255,0.16)" />
      <rect x="220" y="650" width="280" height="24" rx="12" fill="rgba(255,255,255,0.15)" />
      <rect x="248" y="696" width="224" height="18" rx="9" fill="rgba(255,255,255,0.11)" />
      <text x="360" y="1112" text-anchor="middle" fill="white" font-family="Poppins, Arial, sans-serif" font-size="44" font-weight="600">${name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Rafael Ventura",
    rating: 5,
    videoSrc: "",
    thumbnail: createPosterDataUri("Rafael Ventura", "#5e8b8c", "#d9e7e4"),
    muted: true,
    playing: false,
  },
  {
    id: 2,
    name: "Manuel Jo\u00e3o",
    rating: 5,
    videoSrc: "",
    thumbnail: createPosterDataUri("Manuel Joao", "#9b7b5d", "#efe5d8"),
    muted: true,
    playing: false,
  },
  {
    id: 3,
    name: "Vasco McMeska",
    rating: 5,
    videoSrc: "",
    thumbnail: createPosterDataUri("Vasco McMeska", "#63799c", "#e4e8f5"),
    muted: true,
    playing: true,
  },
  {
    id: 4,
    name: "Bernardo Henrique",
    rating: 5,
    videoSrc: "",
    thumbnail: createPosterDataUri("Bernardo Henrique", "#7f8f67", "#dde8d7"),
    muted: true,
    playing: false,
  },
  {
    id: 5,
    name: "ZeroZero",
    rating: 5,
    videoSrc: "",
    thumbnail: createPosterDataUri("ZeroZero", "#8f6672", "#f1dee3"),
    muted: true,
    playing: false,
  },
];

function getRelativeDistance(index, activeIndex, total) {
  const rawDistance = Math.abs(index - activeIndex);

  return Math.min(rawDistance, total - rawDistance);
}

function applySlideStyles(swiper) {
  if (!swiper?.slides?.length) {
    return;
  }

  swiper.slides.forEach((slideEl) => {
    const progress = Math.min(2, Math.round(Math.abs(slideEl.progress)));
    slideEl.style.setProperty("--card-scale", String(SCALE_STEPS[progress]));
    slideEl.style.setProperty("--card-opacity", String(OPACITY_STEPS[progress]));
  });
}

function ChevronIcon({ direction = "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function PlayIcon({ playing }) {
  if (playing) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M8 6.5v11l9-5.5z" />
    </svg>
  );
}

function VolumeIcon({ muted }) {
  return muted ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M5 10v4h3l4 4V6l-4 4zm10.5 2 3.5 3.5-1.5 1.5L14 13.5 10.5 17 9 15.5l3.5-3.5L9 8.5 10.5 7 14 10.5 17.5 7 19 8.5z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M5 10v4h3l4 4V6l-4 4zm10 2c0-1.77-1-3.29-2.47-4.03v8.05A4.48 4.48 0 0 0 15 12m0-7v2.06c2.84.48 5 2.94 5 5.94s-2.16 5.46-5 5.94V21c3.95-.49 7-3.85 7-8s-3.05-7.51-7-8" />
    </svg>
  );
}

function StarRow({ rating }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <svg key={index} aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white/95">
          <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function SocialProofCard({ item, distance, isActive, onToggleMute, onTogglePlay, registerVideo }) {
  const cardScale = SCALE_STEPS[Math.min(distance, 2)];
  const cardOpacity = OPACITY_STEPS[Math.min(distance, 2)];

  return (
    <article
      className="social-proof-card-shell relative mx-auto aspect-[3/4] w-full max-w-[228px] sm:max-w-[238px] lg:max-w-[248px]"
      style={{
        "--manual-card-scale": cardScale,
        "--manual-card-opacity": cardOpacity,
      }}
    >
      <div className="relative h-full overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
        {item.videoSrc ? (
          <video
            ref={(node) => registerVideo(item.id, node)}
            src={item.videoSrc}
            poster={item.thumbnail}
            muted={item.muted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${item.thumbnail}")` }}
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/12" />

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <button
            type="button"
            aria-label={item.muted ? `Ativar som de ${item.name}` : `Silenciar ${item.name}`}
            onClick={() => onToggleMute(item.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/28 bg-white/18 text-white shadow-[0_14px_32px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/26"
          >
            <VolumeIcon muted={item.muted} />
          </button>
          <button
            type="button"
            aria-label={item.playing ? `Pausar video de ${item.name}` : `Reproduzir video de ${item.name}`}
            onClick={() => onTogglePlay(item.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/28 bg-white/18 text-white shadow-[0_14px_32px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/26"
          >
            <PlayIcon playing={item.playing} />
          </button>
        </div>

        {!item.videoSrc ? (
          <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-white/12 px-4 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white/78 backdrop-blur-sm">
            Placeholder video
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-6 text-center">
          <p className="text-[16px] font-semibold tracking-[0.01em] text-white">{item.name}</p>
          <StarRow rating={item.rating} />
        </div>

        {isActive ? (
          <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]" />
        ) : null}
      </div>
    </article>
  );
}

export default function SocialProof() {
  const [items, setItems] = useState(INITIAL_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(2);
  const swiperRef = useRef(null);
  const videoRefs = useRef({});

  const activeItemId = items[activeIndex]?.id;

  const orderedIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    orderedIds.forEach((id) => {
      const video = videoRefs.current[id];
      const item = items.find((entry) => entry.id === id);

      if (!video || !item) {
        return;
      }

      video.muted = item.muted;

      if (id === activeItemId && item.playing) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeItemId, items, orderedIds]);

  const toggleMute = (id) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, muted: !item.muted } : item)));
  };

  const togglePlay = (id) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, playing: !item.playing } : item)));
  };

  const registerVideo = (id, node) => {
    if (node) {
      videoRefs.current[id] = node;
    } else {
      delete videoRefs.current[id];
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white py-14 sm:py-16">
      <Container className="relative flex w-full justify-center">
        <div className="relative mx-auto flex w-full max-w-[1440px] justify-center px-4 sm:px-8 lg:px-10">
          <div className="relative flex w-full max-w-[1280px] items-center justify-center">
            <button
              type="button"
              aria-label="Ver testemunho anterior"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-[7.5%] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827]/92 text-white shadow-[0_18px_46px_rgba(15,23,42,0.22)] transition hover:scale-[1.03] hover:bg-black sm:left-[8.5%] lg:left-[9.5%]"
            >
              <ChevronIcon direction="left" />
            </button>

            <button
              type="button"
              aria-label="Ver proximo testemunho"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-[7.5%] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#111827]/92 text-white shadow-[0_18px_46px_rgba(15,23,42,0.22)] transition hover:scale-[1.03] hover:bg-black sm:right-[8.5%] lg:right-[9.5%]"
            >
              <ChevronIcon direction="right" />
            </button>

            <div className="mx-auto w-full max-w-[1200px]">
              <Swiper
                modules={[EffectCoverflow]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setActiveIndex(swiper.realIndex);
                  applySlideStyles(swiper);
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                onProgress={applySlideStyles}
                onSetTranslate={applySlideStyles}
                onResize={applySlideStyles}
                initialSlide={2}
                centeredSlides
                loop
                grabCursor
                speed={800}
                watchSlidesProgress
                effect="coverflow"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 0,
                  modifier: 1,
                  scale: 1,
                  slideShadows: false,
                }}
                centeredSlidesBounds
                spaceBetween={8}
                slidesPerView={1.25}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1100: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
                className="social-proof-swiper social-proof-stage !overflow-visible"
              >
                {items.map((item, index) => (
                  <SwiperSlide key={item.id} className="!flex !h-auto items-center justify-center">
                    <SocialProofCard
                      item={item}
                      distance={getRelativeDistance(index, activeIndex, items.length)}
                      isActive={item.id === activeItemId}
                      onToggleMute={toggleMute}
                      onTogglePlay={togglePlay}
                      registerVideo={registerVideo}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .social-proof-swiper {
          position: relative;
          display: block;
          background: #ffffff;
          overflow: visible;
          z-index: 1;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .social-proof-stage {
          display: flex;
          align-items: center;
          min-height: 620px;
        }

        .social-proof-swiper .swiper-wrapper {
          position: relative;
          display: flex;
          width: 100%;
          min-height: inherit;
          align-items: center;
          box-sizing: content-box;
          transition-property: transform;
        }

        .social-proof-swiper .swiper-slide {
          position: relative;
          display: flex;
          height: auto;
          min-height: inherit;
          flex-shrink: 0;
          width: auto;
          padding: 0 2px;
          align-items: center;
          justify-content: center;
          transition-property: transform;
        }

        .social-proof-swiper .social-proof-card-shell {
          transform-origin: center center;
          transform: scale(var(--manual-card-scale, 0.92)) translateZ(0);
          opacity: var(--manual-card-opacity, 0.9);
          transition:
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .social-proof-swiper .swiper-slide-active .social-proof-card-shell {
          transform: scale(var(--manual-card-scale, 1)) translateZ(0);
        }

        .social-proof-swiper .swiper-slide-shadow-left,
        .social-proof-swiper .swiper-slide-shadow-right {
          display: none;
        }

        @media (max-width: 1099px) {
          .social-proof-swiper {
            padding: 1.5rem 0;
          }

          .social-proof-stage {
            min-height: 560px;
          }
        }

        @media (max-width: 767px) {
          .social-proof-stage {
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
}
