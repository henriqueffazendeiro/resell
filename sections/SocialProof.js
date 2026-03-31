"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "@/components/ui/container";

const SCALE_STEPS = [1, 0.8965, 0.791, 0.687, 0.582];
const OPACITY_STEPS = [1, 0.94, 0.88, 0.8, 0.72];

function getCardScale(distance) {
  return SCALE_STEPS[Math.min(distance, SCALE_STEPS.length - 1)];
}

function getCardOpacity(distance) {
  return OPACITY_STEPS[Math.min(distance, OPACITY_STEPS.length - 1)];
}

function createPosterDataUri(name, accentColor, baseColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${baseColor}" />
          <stop offset="52%" stop-color="${accentColor}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(15,23,42,0.03)" />
          <stop offset="65%" stop-color="rgba(15,23,42,0.18)" />
          <stop offset="100%" stop-color="rgba(2,6,23,0.88)" />
        </linearGradient>
      </defs>
      <rect width="720" height="1280" rx="56" fill="url(#bg)" />
      <rect width="720" height="1280" rx="56" fill="url(#shade)" />
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
    const distance = Math.round(Math.abs(slideEl.progress));
    slideEl.style.setProperty("--card-scale", String(getCardScale(distance)));
    slideEl.style.setProperty("--card-opacity", String(getCardOpacity(distance)));
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
  const cardScale = getCardScale(distance);
  const cardOpacity = getCardOpacity(distance);

  return (
    <article
      className="social-proof-card-shell relative mx-auto w-full"
      style={{
        aspectRatio: "9.6 / 14",
        "--manual-card-scale": cardScale,
        "--manual-card-opacity": cardOpacity,
      }}
    >
      <div className="relative h-full overflow-hidden rounded-[16px] border border-white/70 bg-white">
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
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <button
            type="button"
            aria-label={item.muted ? `Ativar som de ${item.name}` : `Silenciar ${item.name}`}
            onClick={() => onToggleMute(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-500/35 text-white transition hover:bg-slate-400/45"
          >
            <VolumeIcon muted={item.muted} />
          </button>
          <button
            type="button"
            aria-label={item.playing ? `Pausar video de ${item.name}` : `Reproduzir video de ${item.name}`}
            onClick={() => onTogglePlay(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-500/35 text-white transition hover:bg-slate-400/45"
          >
            <PlayIcon playing={item.playing} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-6 text-center">
          <p className="text-[16px] font-semibold tracking-[0.01em] text-white">{item.name}</p>
          <StarRow rating={item.rating} />
        </div>
      </div>
    </article>
  );
}

export default function SocialProof() {
  const [items, setItems] = useState(INITIAL_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(2);
  const swiperRef = useRef(null);
  const videoRefs = useRef({});
  const slides = useMemo(() => [...items, ...items], [items]);

  const activeSlide = slides[activeIndex];
  const orderedIndexes = useMemo(() => slides.map((_, index) => index), [slides]);

  useEffect(() => {
    orderedIndexes.forEach((index) => {
      const video = videoRefs.current[index];
      const item = slides[index];

      if (!video || !item) {
        return;
      }

      video.muted = item.muted;

      if (index === activeIndex && item.playing) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, orderedIndexes, slides]);

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
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-white py-0">
      <Container className="relative flex w-full max-w-none justify-center px-0">
        <div className="relative mx-auto flex w-full max-w-[1560px] justify-center px-4 sm:px-8 lg:px-10">
          <div className="relative flex w-full max-w-[1440px] items-center justify-center">
            <div className="social-proof-frame relative mx-auto w-full max-w-[380px] sm:max-w-[713px] lg:max-w-[1195.8px]">
              <button
                type="button"
                aria-label="Ver testemunho anterior"
                onClick={() => swiperRef.current?.slidePrev()}
                className="social-proof-arrow absolute top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-[250ms] ease-in-out hover:scale-[1.03]"
                style={{ left: "40px" }}
              >
                <ChevronIcon direction="left" />
              </button>

              <button
                type="button"
                aria-label="Ver proximo testemunho"
                onClick={() => swiperRef.current?.slideNext()}
                className="social-proof-arrow absolute top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-[250ms] ease-in-out hover:scale-[1.03]"
                style={{ right: "40px" }}
              >
                <ChevronIcon direction="right" />
              </button>

              <div className="social-proof-window mx-auto w-full overflow-hidden">
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
                spaceBetween={10}
                slidesPerView={1.5}
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
                className="social-proof-swiper social-proof-stage"
              >
                {slides.map((item, index) => (
                  <SwiperSlide key={`${item.id}-${index}`} className="!flex !h-auto items-center justify-center">
                    <SocialProofCard
                      item={item}
                      distance={getRelativeDistance(index, activeIndex, slides.length)}
                      isActive={index === activeIndex && item.id === activeSlide?.id}
                      onToggleMute={toggleMute}
                      onTogglePlay={togglePlay}
                      registerVideo={(id, node) => registerVideo(index, node)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .social-proof-swiper {
          position: relative;
          display: block;
          background: transparent;
          box-shadow: none;
          overflow: hidden;
          z-index: 1;
          margin: 0 auto;
          padding: 0;
        }

        .social-proof-arrow {
          background: #cbd5e1;
          color: #0f172a;
        }

        .social-proof-arrow:hover {
          background: #ffffff;
          color: #cbd5e1;
        }

        .social-proof-frame,
        .social-proof-window {
          position: relative;
          background: transparent;
          box-shadow: none;
          padding: 0;
        }

        .social-proof-stage {
          display: flex;
          align-items: center;
          background: transparent;
          box-shadow: none;
          min-height: 380px;
        }

        .social-proof-swiper .swiper-wrapper {
          position: relative;
          display: flex;
          width: 100%;
          min-height: inherit;
          align-items: center;
          background: transparent;
          box-shadow: none;
          box-sizing: content-box;
          transition-property: transform;
        }

        .social-proof-swiper .swiper-slide {
          position: relative;
          display: flex;
          height: auto;
          min-height: inherit;
          flex-shrink: 0;
          background: transparent;
          box-shadow: none;
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

        .social-proof-frame::before,
        .social-proof-frame::after,
        .social-proof-window::before,
        .social-proof-window::after,
        .social-proof-swiper::before,
        .social-proof-swiper::after {
          content: none;
        }

        @media (max-width: 1099px) {
          .social-proof-window {
            padding: 0;
          }

          .social-proof-swiper {
            padding: 0;
          }

          .social-proof-stage {
            min-height: 340px;
          }
        }

        @media (max-width: 767px) {
          .social-proof-window {
            padding: 0;
          }

          .social-proof-stage {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
