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

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Testemunho 1",
    rating: 5,
    videoSrc: "/video1.mp4",
    thumbnail: "",
    muted: true,
    playing: false,
  },
  {
    id: 2,
    name: "Testemunho 2",
    rating: 5,
    videoSrc: "/video2.mp4",
    thumbnail: "",
    muted: true,
    playing: false,
  },
  {
    id: 3,
    name: "Testemunho 3",
    rating: 5,
    videoSrc: "/video3.mp4",
    thumbnail: "",
    muted: true,
    playing: true,
  },
  {
    id: 4,
    name: "Testemunho 4",
    rating: 5,
    videoSrc: "/ssstik.io_1775931249473.mp4",
    thumbnail: "",
    videoClassName: "scale-[1.22] object-center",
    muted: true,
    playing: false,
  },
  {
    id: 5,
    name: "Testemunho 5",
    rating: 5,
    videoSrc: "/video5.mp4",
    thumbnail: "",
    videoClassName: "scale-[1.22] object-center",
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
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="block h-6 w-6 shrink-0 fill-current"
      >
        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="block h-6 w-6 shrink-0 fill-current"
    >
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
    </svg>
  );
}

function VolumeIcon({ muted }) {
  return muted ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0 0 21 12a8.982 8.982 0 0 0-3.304-6.968l1.42-1.42A10.976 10.976 0 0 1 23 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0 0 16 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 18 12c0 1.842-.83 3.49-2.137 4.591z" />
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
            className={`absolute inset-0 h-full w-full object-cover ${item.videoClassName ?? ""}`}
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition"
            style={{ backgroundColor: "#FFFFFF4D" }}
          >
            <VolumeIcon muted={item.muted} />
          </button>
          <button
            type="button"
            aria-label={item.playing ? `Pausar video de ${item.name}` : `Reproduzir video de ${item.name}`}
            onClick={() => onTogglePlay(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition"
            style={{ backgroundColor: "#FFFFFF4D" }}
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
    <section className="social-proof-root relative flex w-full items-center justify-center overflow-hidden bg-white py-0">
      <Container className="social-proof-container relative flex w-full max-w-none justify-center px-0">
        <div className="social-proof-outer relative mx-auto flex w-full max-w-[1560px] justify-center px-0 sm:px-8 lg:px-10">
          <div className="social-proof-inner relative flex w-full items-center justify-center sm:max-w-[1440px]">
            <div className="social-proof-frame relative mx-auto w-full max-w-none sm:max-w-[713px] lg:max-w-[1195.8px]">
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
                  setItems((current) =>
                    current.map((item, index) => (index === swiper.realIndex ? { ...item, playing: true } : item))
                  );
                  applySlideStyles(swiper);
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                  setItems((current) =>
                    current.map((item, index) => (index === swiper.realIndex ? { ...item, playing: true } : item))
                  );
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
                centeredSlidesBounds={false}
                spaceBetween={4}
                slidesPerView={1.46}
                breakpoints={{
                  768: {
                    centeredSlidesBounds: false,
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1100: {
                    centeredSlidesBounds: false,
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
          .social-proof-root {
            overflow: visible;
          }

          .social-proof-container,
          .social-proof-outer,
          .social-proof-inner,
          .social-proof-frame {
            width: 100% !important;
            max-width: none !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .social-proof-frame,
          .social-proof-window,
          .social-proof-swiper {
            overflow: visible;
          }

          .social-proof-arrow {
            display: none;
          }

          .social-proof-window {
            padding: 0;
          }

          .social-proof-swiper .swiper-slide {
            padding-left: 2px;
            padding-right: 2px;
          }

          .social-proof-card-shell {
            width: 100%;
            max-width: none;
          }

          .social-proof-stage {
            min-height: 318px;
          }
        }
      `}</style>
    </section>
  );
}
