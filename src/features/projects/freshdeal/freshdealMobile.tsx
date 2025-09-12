import React, { useRef, useState } from "react";
import styles from "./freshdealMobile.module.css";
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

import TechSlider from "@/components/tech-slider/tech-slider";
import { getLenisInstance } from "../../../utils/scrollControls";

gsap.registerPlugin(ScrollTrigger);

type FreshdealProps = {
  enableAnimation?: boolean;
};

type InternalTimeline = { _time: number; _dur: number; _tTime: number };

const Freshdeal: React.FC<FreshdealProps> = () => {
  // Use the custom hooks for animations and transformations
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
        setActiveIndex((i) => (i + 1) % appData.length);
      };
      const onPrev = () => {
        offsetPlayheadBy(-spacing);
        setActiveIndex((i) => (i - 1 + appData.length) % appData.length);
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
        setActiveIndex((i) => (i + dir + appData.length) % appData.length);
      };
      const listenerOptions: AddEventListenerOptions = { passive: !isHovered };
      el.addEventListener("wheel", onWheel as EventListener, listenerOptions);
      return () =>
        el.removeEventListener(
          "wheel",
          onWheel as EventListener,
          listenerOptions
        );
    },
    { dependencies: [isHovered] }
  );

  const appData = [
    {
      src: addressSelectionSvg,
      alt: "Address Selection",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. UI shows address selection with clear options.",
    },
    {
      src: accountsSvg,
      alt: "Accounts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Account overview and quick settings.",
    },
    {
      src: achievementsSvg,
      alt: "Achievements",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Achievement badges and progress.",
    },
    {
      src: freshdealsSvg,
      alt: "Fresh Deals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Daily fresh deals with highlights.",
    },
    {
      src: restaurantsSvg,
      alt: "Restaurants",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Restaurant listing with filters.",
    },
    {
      src: restaurantsMapSvg,
      alt: "Restaurants on Map",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Map view with nearby restaurants.",
    },
  ];

  return (
    <section className={styles.projectSection} id="freshdeal">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Mobile App for Customers</span>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>Freshdeal Mobile </h3>
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/freshdeal-web"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Freshdeal Web on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              FreshDeal is an innovative platform that tackles food waste by
              connecting businesses with surplus food to consumers seeking
              affordable, high-quality meals. The app's mission is to reduce
              food waste, provide budget-friendly meals, and promote
              sustainability, aligning with the UN's Sustainable Development
              Goals.
            </p>
            <TechSlider
              icons={["typescript", "redux", "react-native", "expo", "nodejs"]}
              speed={40}
            />
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/freshdeal-web"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Freshdeal Web on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.combinedContainer}>
        <div className={styles.slideInfo}>
          <div>
            <h3 className={styles.slideTitle}>
              {appData[activeIndex % appData.length].alt}
            </h3>
            <p className={styles.slideText}>
              {appData[activeIndex % appData.length].description}
            </p>
          </div>
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
        </div>

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
          <div ref={galleryRef} className={styles.gallery}>
            <ul ref={cardsListRef} className={styles.cards}>
              {appData
                .concat(appData)
                .slice(0, 10)
                .map((item, idx) => (
                  <li key={idx} className={styles.card}>
                    <img
                      className={styles.cardImage}
                      src={item.src}
                      alt={item.alt}
                    />
                  </li>
                ))}
            </ul>

            {!isHovered && (
              <div className={styles.hoverHint} aria-hidden="true">
                <span>Hover to scroll</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Freshdeal;
