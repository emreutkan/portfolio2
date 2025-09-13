import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState } from "react";
import styles from "./todra.module.css";

import IPhoneMockup from "@/components/iphone-mockup";
import TechSlider from "@/components/tech-slider/tech-slider";
import { getLenisInstance } from "../../../utils/scrollControls";

// Import images
import todra1 from "./images/todra1.jpg";
import todra2 from "./images/todra2.jpg";
import todra3 from "./images/todra3.jpg";
import todra4 from "./images/todra4.jpg";

gsap.registerPlugin(ScrollTrigger);

type TodraProps = {
  enableAnimation?: boolean;
};

type InternalTimeline = { _time: number; _dur: number; _tTime: number };

const Todra: React.FC<TodraProps> = () => {
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
      src: todra1,
      alt: "Task List View",
      description:
        "Clean and intuitive task management interface with categories, priorities, and due dates. Easily organize your daily tasks with a beautiful, distraction-free design.",
    },
    {
      src: todra2,
      alt: "Task Creation",
      description:
        "Simple yet powerful task creation with date pickers, priority levels, and category selection. Set reminders and organize your workflow efficiently.",
    },
    {
      src: todra3,
      alt: "Categories & Filtering",
      description:
        "Organize tasks by categories and filter by priority, due date, or completion status. Find what you need quickly with smart filtering options.",
    },
    {
      src: todra4,
      alt: "Settings & Export",
      description:
        "Customize your experience with theme options, notification settings, and data export features. Your data stays private and under your control.",
    },
  ];

  return (
    <section className={styles.projectSection} id="todra">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Local To-Do App</span>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>Todra</h3>
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/Todra"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Todra on GitHub">
                View on GitHub
              </a>
              <a
                href="https://testflight.apple.com/join/28jvjwhU"
                className={styles.testflightButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Todra on TestFlight">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.19 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                TestFlight
              </a>
              <a
                href="https://github.com/emreutkan/Todra/releases/tag/pre-release"
                className={styles.downloadButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download APK file">

                .apk
              </a>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Todra is a local to‑do app that puts privacy first. Add tasks with
              due dates, priorities, and categories, then mark or archive them
              when done. Enable local reminders and export/import your data as
              JSON. All data is stored on your device – no accounts, no servers,
              no tracking.
            </p>
            <TechSlider
              icons={["react-native", "typescript", "expo"]}
              speed={40}
            />
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
                    <div className={styles.phoneScaledWrapper}>
                      <IPhoneMockup
                        images={[{ src: item.src, alt: item.alt }]}
                        flat
                        className={styles.phoneScaled}
                      />
                    </div>
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

export default Todra;
