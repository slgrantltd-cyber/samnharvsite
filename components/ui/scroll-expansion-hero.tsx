"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from "react";
import Image from "next/image";

/**
 * Scroll-expansion hero (adapted from the user's supplied component).
 * The film begins as a small mounted panel and grows to full frame as the
 * visitor scrolls; the headline slides apart around it, then the page
 * releases into normal scrolling.
 *
 * Adaptations to this codebase:
 * - restyled from blue/rounded/black-glow to the material system (ink type,
 *   square panel, warm daylight shadow, plaster ground);
 * - the background layer is a material surface, not a required image;
 * - pauses the shared Lenis smooth-scroll while capturing wheel/touch input
 *   and resumes it once expanded (they'd otherwise fight);
 * - reduced motion starts fully expanded — no scroll capture at all;
 * - the title renders as the page h1.
 */

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  /** difference-blended light type — for dark background imagery */
  textBlend?: boolean;
  children?: ReactNode;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [reducedState, setReducedState] = useState<boolean>(false);
  const [videoReady, setVideoReady] = useState<boolean>(false);
  const reducedRef = useRef(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* smoothed progress: input nudges a target; a rAF loop lerps the
     displayed progress toward it so expansion and scrub move with weight */
  const targetRef = useRef(0);
  const displayRef = useRef(0);
  const animRaf = useRef(0);
  const animating = useRef(false);

  const tickSmooth = () => {
    const target = targetRef.current;
    let next = displayRef.current + (target - displayRef.current) * 0.16;
    if (Math.abs(target - next) < 0.001) next = target;
    displayRef.current = next;
    setScrollProgress(next);

    if (next >= 0.998 && target >= 1) {
      setMediaFullyExpanded(true);
      setShowContent(true);
    } else if (next < 0.75) {
      setShowContent(false);
    }

    if (next !== target) {
      animRaf.current = requestAnimationFrame(tickSmooth);
    } else {
      animating.current = false;
    }
  };

  const nudge = (delta: number) => {
    targetRef.current = Math.min(Math.max(targetRef.current + delta, 0), 1);
    if (!animating.current) {
      animating.current = true;
      animRaf.current = requestAnimationFrame(tickSmooth);
    }
  };
  const nudgeRef = useRef(nudge);
  useEffect(() => {
    nudgeRef.current = nudge;
  });

  useEffect(() => () => cancelAnimationFrame(animRaf.current), []);

  /* fade the film in over its poster the moment real frames are rendering.
     Never gate on canplaythrough: on a normal connection a large file can
     take tens of seconds to buffer fully, and the film would play invisibly
     behind the poster the whole time. readyState is also checked directly
     so a cached load can't outrun the listeners. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const markReady = () => setVideoReady(true);
    if (v.readyState >= 2) {
      markReady();
      return;
    }
    const events = ["playing", "canplay", "loadeddata"] as const;
    events.forEach((e) => v.addEventListener(e, markReady, { once: true }));
    // whatever happens, never hold the poster veil forever
    const safety = window.setTimeout(markReady, 3500);
    return () => {
      events.forEach((e) => v.removeEventListener(e, markReady));
      window.clearTimeout(safety);
    };
  }, []);

  /* browsers can refuse the initial autoplay outright (iOS Low Power Mode,
     Safari's "Never Auto-Play", data-saver). A muted play() retried on the
     first real gesture is always permitted — without this the hero would
     sit frozen on its poster. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const events = ["pointerdown", "touchstart", "keydown", "wheel"] as const;
    const retry = () => {
      events.forEach((e) => window.removeEventListener(e, retry));
      if (v.paused && !reducedRef.current) v.play().catch(() => {});
    };
    events.forEach((e) =>
      window.addEventListener(e, retry, { passive: true, once: true }),
    );
    return () => events.forEach((e) => window.removeEventListener(e, retry));
  }, []);

  /* the film runs continuously (autoplay + loop); it only pauses when the
     hero leaves the viewport, or for reduced-motion visitors */
  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;
    const io = new IntersectionObserver(([entry]) => {
      if (reducedRef.current) {
        v.pause();
        return;
      }
      if (entry.isIntersecting) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia(REDUCED_QUERY).matches) return;
    reducedRef.current = true;
    // jump straight to the expanded state — no scroll capture at all
    const id = requestAnimationFrame(() => {
      targetRef.current = 1;
      displayRef.current = 1;
      setReducedState(true);
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  /* pause the shared smooth-scroller while this section owns the wheel */
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis || reducedRef.current) return;
    if (mediaFullyExpanded) {
      lenis.start();
    } else {
      lenis.stop();
    }
    return () => lenis.start();
  }, [mediaFullyExpanded]);

  useEffect(() => {
    if (reducedRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        nudgeRef.current(e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        nudgeRef.current(deltaY * scrollFactor);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener,
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener,
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [mediaFullyExpanded, touchStartY]);

  /* once the visitor scrolls on past the expanded film, fade the stage out
     and release it — a full-viewport video layer is expensive to drag
     up-screen, and the fade reads better than the shear */
  useEffect(() => {
    if (reducedRef.current) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = stageRef.current;
        if (!el) return;
        const f = Math.max(
          0,
          Math.min(1, 1 - window.scrollY / (window.innerHeight * 0.55)),
        );
        el.style.opacity = String(f);
        el.style.visibility = f === 0 ? "hidden" : "visible";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  // Reduced motion: no scroll capture, no sliding type — a composed static
  // hero instead: headline, the film's poster frame, then the content.
  if (reducedState) {
    return (
      <div className="overflow-x-hidden">
        <section className="m-limestone flex min-h-[100dvh] flex-col items-center justify-center gap-10 px-5 pb-16 pt-28 md:px-10">
          {title && (
            <h1 className="display text-center text-[10vw] leading-[1.04] text-ink md:text-7xl">
              {firstWord}
              <br />
              {restOfTitle}
            </h1>
          )}
          <div className="shadow-daylight w-full max-w-4xl overflow-clip">
            <div className="relative aspect-video w-full overflow-clip">
              {posterSrc ? (
                <Image
                  src={posterSrc}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="scale-[1.19] object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[#252421]" />
              )}
            </div>
          </div>
          {date && <p className="annot muted">{date}</p>}
          <div className="w-full">{children}</div>
        </section>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          {/* ground: a material surface (or image) that recedes as the film grows */}
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ opacity: 1 - scrollProgress }}
          >
            {bgImageSrc ? (
              <Image
                src={bgImageSrc}
                alt=""
                width={1920}
                height={1080}
                className="h-screen w-screen object-cover object-center"
                priority
              />
            ) : (
              <div className="m-limestone h-full w-full" />
            )}
          </div>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-start">
            <div
              ref={stageRef}
              className="relative flex h-[100dvh] w-full flex-col items-center justify-center"
            >
              <div
                className="shadow-daylight absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full overflow-clip">
                    {/* poster layer: visible instantly, the film fades in over it */}
                    {posterSrc && (
                      <Image
                        src={posterSrc}
                        alt=""
                        fill
                        priority
                        sizes="95vw"
                        className="object-cover object-[58%_45%] md:object-center"
                      />
                    )}
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="auto"
                      className={`h-full w-full object-cover object-[58%_45%] transition-opacity duration-700 ease-out md:object-center ${
                        videoReady ? "opacity-100" : "opacity-0"
                      }`}
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    {/* warm veil that lifts as the film takes the frame */}
                    <div
                      className="absolute inset-0 bg-[#252421]"
                      style={{ opacity: Math.max(0, 0.3 - scrollProgress * 0.3) }}
                    />
                    {/* cinematic vignette — quiet edges, open centre */}
                    <div className="hero-vignette absolute inset-0" />
                    <div className="hero-veil absolute inset-0" />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-[#252421]"
                      style={{ opacity: Math.max(0, 0.3 - scrollProgress * 0.3) }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-5 flex flex-col items-center text-center transition-none">
                  {date && (
                    <p
                      className={`annot ${textBlend ? "text-stone-dark" : "muted"}`}
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className={`annot mt-1.5 ${textBlend ? "text-bronze-bright" : "text-bronze"}`}
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {title && (
                <h1 className="relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center transition-none md:gap-4">
                  <span
                    className={`display block text-[10vw] transition-none md:text-7xl lg:text-8xl ${
                      textBlend ? "text-plaster mix-blend-difference" : "text-ink"
                    }`}
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {firstWord}
                  </span>
                  <span
                    className={`display block text-center text-[10vw] transition-none md:text-7xl lg:text-8xl ${
                      textBlend ? "text-plaster mix-blend-difference" : "text-ink"
                    }`}
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {restOfTitle}
                  </span>
                </h1>
              )}
            </div>

            <section
              className="flex w-full flex-col px-8 py-10 transition-opacity duration-700 ease-out md:px-16 lg:py-20"
              style={{ opacity: showContent ? 1 : 0 }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
