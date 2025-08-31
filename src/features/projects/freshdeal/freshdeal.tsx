import React, { useRef, useState } from "react";
import styles from "./freshdeal.module.css";
// Import SVG assets
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import accountsSvg from "../../../assets/freshdeal_accounts.svg";
import achievementsSvg from "../../../assets/freshdeal_achievements.svg";
import addressSelectionSvg from "../../../assets/freshdeal_address_selection.svg";
import freshdealsSvg from "../../../assets/freshdeal_freshdeals.svg";
import restaurantsSvg from "../../../assets/freshdeal_restaurants.svg";
import restaurantsMapSvg from "../../../assets/freshdeal_restaurants_on_map.svg";
// import IPhoneMockup from "../../../components/iphone-mockup";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import { getLenisInstance } from "../../../utils/scrollControls";

gsap.registerPlugin(ScrollTrigger);

type FreshdealProps = {
  enableAnimation?: boolean;
};

type InternalTimeline = { _time: number; _dur: number; _tTime: number };

const Freshdeal: React.FC<FreshdealProps> = ({ enableAnimation = true }) => {
  // Use the custom hooks for animations and transformations
  const { sectionRef } = useSectionRounding();
  const USE_ANIMATION = enableAnimation;
  // Create refs for GSAP animations
  const titleRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  // Gallery refs
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsListRef = useRef<HTMLUListElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelAtRef = useRef<number>(0);
  const SPACING = 0.1;

  // GSAP gallery internals
  const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);
  const scrubTweenRef = useRef<gsap.core.Tween | null>(null);
  // We avoid ScrollTrigger for the gallery to prevent conflicts with Lenis
  // GSAP animations
  useGSAP(
    () => {
      if (!USE_ANIMATION) return;

      // Create a timeline for better animation control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
          markers: false,
        },
      });

      // Set initial positions
      gsap.set(titleRef.current, {
        display: "flex",
        position: "absolute",
        top: "-60px",
        left: "50%",
        xPercent: -50,
        padding: 0,
        margin: 0,
      });

      gsap.set(phoneRef.current, {
        position: "absolute",
        top: "120px",
        left: "50%",
        xPercent: -50,
        scale: 1,
      });

      gsap.set(contentContainerRef.current, {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        justifySelf: "flex-end",
        alignContent: "flex-end",
        justifyItems: "flex-end",
      });

      // Smooth scroll-triggered animations
      tl.to(
        titleRef.current,
        {
          y: 200,
          scale: 0,
          opacity: 0,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          phoneRef.current,
          {
            y: -80,
            scale: 1.1,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          phoneRef.current,
          {
            x: -500,
            ease: "power2.inOut",
          },
          0.3
        )
        .to(
          contentWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            visibility: "visible",
            ease: "power2.inOut",
          },
          0.3
        );
    },
    { scope: sectionRef }
  );

  // Build seamless gallery once after cards are in the DOM
  useGSAP(
    () => {
      const cards = Array.from(
        (cardsListRef.current?.querySelectorAll(
          "li"
        ) as NodeListOf<HTMLLIElement>) || []
      );
      if (!cards.length) return;

      const images = cards
        .map((li) => li.querySelector("img"))
        .filter(Boolean) as HTMLImageElement[];
      gsap.to(images, {
        opacity: 1,
        delay: 0.1,
        duration: 0.3,
        overwrite: true,
      });

      const spacing = SPACING;
      const snap = gsap.utils.snap(spacing);

      const buildSeamlessLoop = (items: HTMLElement[], itemSpacing: number) => {
        const overlap = Math.ceil(1 / itemSpacing);
        const startTime = items.length * itemSpacing + 0.5;
        const loopTime = (items.length + overlap) * itemSpacing + 1;
        const rawSequence = gsap.timeline({ paused: true });
        const seamlessLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            const t = this as unknown as InternalTimeline;
            if (t._time === t._dur) {
              t._tTime += t._dur - 0.01;
            }
          },
        });

        gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

        const l = items.length + overlap * 2;
        for (let i = 0; i < l; i++) {
          const index = i % items.length;
          const item = items[index];
          const time = i * itemSpacing;
          rawSequence
            .fromTo(
              item,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                zIndex: 100,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: "power1.in",
                immediateRender: false,
              },
              time
            )
            .fromTo(
              item,
              { xPercent: 400 },
              {
                xPercent: -400,
                duration: 1,
                ease: "none",
                immediateRender: false,
              },
              time
            );
          if (i <= items.length) seamlessLoop.add("label" + i, time);
        }

        rawSequence.time(startTime);
        seamlessLoop
          .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
          })
          .fromTo(
            rawSequence,
            { time: overlap * itemSpacing + 1 },
            {
              time: startTime,
              duration: startTime - (overlap * itemSpacing + 1),
              immediateRender: false,
              ease: "none",
            }
          );

        return seamlessLoop;
      };

      seamlessLoopRef.current = buildSeamlessLoop(
        cards as HTMLElement[],
        spacing
      );
      if (!seamlessLoopRef.current) return;

      scrubTweenRef.current = gsap.to(seamlessLoopRef.current, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      const offsetPlayheadBy = (delta: number) => {
        if (!scrubTweenRef.current || !seamlessLoopRef.current) return;
        const loop = seamlessLoopRef.current;
        const current = (scrubTweenRef.current.vars.totalTime as number) || 0;
        const dur = loop.duration();
        const next = current + delta;
        const wrapped = ((next % dur) + dur) % dur;
        scrubTweenRef.current.vars.totalTime = snap(wrapped);
        scrubTweenRef.current.invalidate().restart();
      };

      // Attach button handlers via React refs
      const onNext = () => {
        offsetPlayheadBy(spacing);
        setActiveIndex((i) => (i + 1) % appImages.length);
      };
      const onPrev = () => {
        offsetPlayheadBy(-spacing);
        setActiveIndex((i) => (i - 1 + appImages.length) % appImages.length);
      };
      nextBtnRef.current?.addEventListener("click", onNext);
      prevBtnRef.current?.addEventListener("click", onPrev);

      // Cleanup listeners on scope revert
      return () => {
        nextBtnRef.current?.removeEventListener("click", onNext);
        prevBtnRef.current?.removeEventListener("click", onPrev);
      };
    },
    { scope: galleryRef }
  );

  // Local wheel scrubbing when hovered
  useGSAP(
    () => {
      const el = galleryRef.current;
      if (!el) return;
      const onWheel = (e: WheelEvent) => {
        if (!isHovered) return;
        if (!scrubTweenRef.current || !seamlessLoopRef.current) return;
        e.preventDefault();
        const now = performance.now();
        if (now - (lastWheelAtRef.current || 0) < 120) return;
        lastWheelAtRef.current = now;
        const dir = e.deltaY > 0 ? 1 : -1;
        const spacing = SPACING;
        const snap = gsap.utils.snap(spacing);
        const loop = seamlessLoopRef.current;
        const current = (scrubTweenRef.current.vars.totalTime as number) || 0;
        const dur = loop.duration();
        const next = current + dir * spacing;
        const wrapped = ((next % dur) + dur) % dur;
        scrubTweenRef.current.vars.totalTime = snap(wrapped);
        scrubTweenRef.current.invalidate().restart();
        setActiveIndex((i) => (i + dir + appImages.length) % appImages.length);
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel as EventListener);
    },
    { dependencies: [isHovered] }
  );

  const appImages = [
    {
      src: addressSelectionSvg,
      alt: "Freshdeal App - Address Selection",
    },
    {
      src: accountsSvg,
      alt: "Freshdeal App - Accounts",
    },
    {
      src: achievementsSvg,
      alt: "Freshdeal App - Achievements",
    },
    {
      src: freshdealsSvg,
      alt: "Freshdeal App - Fresh Deals",
    },
    {
      src: restaurantsSvg,
      alt: "Freshdeal App - Restaurants",
    },
    {
      src: restaurantsMapSvg,
      alt: "Freshdeal App - Restaurants on Map",
    },
  ];

  const slideDescriptions: string[] = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. UI shows address selection with clear options.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Account overview and quick settings.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Achievement badges and progress.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Daily fresh deals with highlights.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Restaurant listing with filters.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Map view with nearby restaurants.",
  ];

  return (
    <section
      ref={sectionRef}
      className={styles.freshdealSection}
      id="freshdeal">
      <div ref={contentContainerRef} className={styles.contentContainer}>
        <div className={styles.headerBlock}>
          <h1 className={styles.pageTitle}>Freshdeal</h1>
          <p className={styles.blurb}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vitae arcu non nunc mattis congue. Nullam ac justo id nisi interdum
            vulputate.
          </p>
        </div>
      </div>
      {/* Gallery */}
      <div
        ref={galleryWrapperRef}
        className={styles.galleryWrapper}
        onMouseEnter={() => {
          setIsHovered(true);
          // Pause Lenis while interacting with the gallery
          getLenisInstance()?.stop();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          // Resume Lenis when leaving the gallery
          getLenisInstance()?.start();
        }}>
        <div
          ref={galleryRef}
          className={styles.gallery}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <ul ref={cardsListRef} className={styles.cards}>
            {appImages
              .concat(appImages)
              .slice(0, 10)
              .map((img, idx) => (
                <li key={idx} className={styles.card}>
                  <img
                    className={styles.cardImage}
                    src={img.src}
                    alt={img.alt}
                  />
                </li>
              ))}
          </ul>
          <div className={styles.galleryActions}>
            <button
              ref={prevBtnRef}
              className={styles.navButton}
              aria-label="Previous">
              Prev
            </button>
            <button
              ref={nextBtnRef}
              className={styles.navButton}
              aria-label="Next">
              Next
            </button>
          </div>
          {!isHovered && (
            <div className={styles.hoverHint} aria-hidden="true">
              Hover to scroll
            </div>
          )}
        </div>
      </div>
      <div className={styles.slideInfo}>
        <h3 className={styles.slideTitle}>
          {appImages[activeIndex % appImages.length].alt}
        </h3>
        <p className={styles.slideText}>
          {slideDescriptions[activeIndex % slideDescriptions.length]}
        </p>
      </div>
    </section>
  );
};

export default Freshdeal;
