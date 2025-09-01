import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { scrollToSection } from "../../utils/scrollControls";
import Citrus from "./citrus/citrus";
import Evade from "./evade/evade";
import FreshdealBackend from "./freshdeal-backend/freshdeal-backend";
import FreshdealBusiness from "./freshdeal-web/freshdeal-business";
import Freshdeal from "./freshdeal/freshdealMobile";
import Jukebox from "./jukebox/jukebox";
import styles from "./projects.module.css";
gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const items = useMemo(
    () => [
      {
        title: "Freshdeal Mobile",
        element: <Freshdeal enableAnimation={false} />,
      },
      { title: "Freshdeal Business", element: <FreshdealBusiness /> },
      { title: "Freshdeal Backend", element: <FreshdealBackend /> },
      { title: "Jukebox", element: <Jukebox /> },
      { title: "Citrus", element: <Citrus /> },

      { title: "Evade", element: <Evade /> },
    ],
    []
  );

  // Active project index (derived from ScrollTrigger enter/enterBack)
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const projectsPinRef = useRef<HTMLDivElement | null>(null);

  const updateActiveIndexFromContainer = () => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;

    panelRefs.current.forEach((panelElement, index) => {
      if (!panelElement) return;
      const panelTopWithinContainer = panelElement.offsetTop;
      const distanceFromScrollTop = Math.abs(
        panelTopWithinContainer - containerElement.scrollTop
      );
      if (distanceFromScrollTop < smallestDistance) {
        smallestDistance = distanceFromScrollTop;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useGSAP(() => {
    gsap.to(projectsRef.current, {
      marginTop: "0vh",
      borderTopRightRadius: "0px",
      borderTopLeftRadius: "0px",
      marginLeft: "0vw",
      marginRight: "0vw",
      scrollTrigger: {
        id: "ProjectsWiden",
        trigger: projectsRef.current,
        start: "-7%",
        end: "-4%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const getRightPaneScrollHeight = () => {
      if (!containerRef.current) return window.innerHeight;
      return (
        containerRef.current.scrollHeight - containerRef.current.clientHeight
      );
    };

    // Create the scroll hijacking effect
    ScrollTrigger.create({
      trigger: projectsPinRef.current,
      start: "top top",
      end: () => `+=${getRightPaneScrollHeight() + window.innerHeight}`, // Dynamic end based on content
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      refreshPriority: -1,
      onUpdate: (self) => {
        if (!containerRef.current) return;

        // Calculate how much to scroll the rightPane based on scroll progress
        const scrollProgress = self.progress;
        const maxScroll = getRightPaneScrollHeight();
        const targetScroll = scrollProgress * maxScroll;

        // Scroll the rightPane
        containerRef.current.scrollTop = targetScroll;

        // Update active index for left nav highlighting
        updateActiveIndexFromContainer();
      },
      onEnter: () => {
        // Disable native scroll during pin
        if (containerRef.current) {
          containerRef.current.style.overflowY = "hidden";
        }
      },
      onLeave: () => {
        // Re-enable normal scrolling
        if (containerRef.current) {
          containerRef.current.style.overflowY = "scroll";
        }
      },
      onEnterBack: () => {
        if (containerRef.current) {
          containerRef.current.style.overflowY = "hidden";
        }
      },
      onLeaveBack: () => {
        if (containerRef.current) {
          containerRef.current.style.overflowY = "scroll";
        }
      },
    });

    gsap.to(headerRef.current, {
      y: "-11vh",
      marginBottom: "0vh",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "-7%",
        end: "-4%",
        scrub: true,
      },
    });
    gsap.to(headerRef.current, {
      // scale: 0,
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "-5%",
        end: "-4%",
        scrub: true,
      },
    });
  }, []);

  // When user scrolls the rightPane natively (e.g., before pin or when unpinned), keep active index in sync
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => updateActiveIndexFromContainer();
    el.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (index: number) => {
    const id = `project-panel-${index}`;
    const el = document.getElementById(id);
    if (el) {
      scrollToSection(el, 0);
    }
  };

  const counter = String(activeIndex + 1).padStart(2, "0");

  return (
    <section ref={projectsPinRef}>
      <section
        ref={projectsRef}
        className={styles.projectsSection}
        id="projects">
        <div ref={headerRef} className={styles.projectsHeader}>
          <h3>Projects & Skills</h3>
        </div>
        <div className={styles.counterContainer}></div>

        <div className={styles.projectsLayout}>
          <aside className={styles.leftNav} aria-label="Project list">
            <h3>{counter}</h3>{" "}
            <ul className={styles.navList}>
              {items.map((p, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={
                      i === activeIndex
                        ? `${styles.navItem} ${styles.navItemActive}`
                        : styles.navItem
                    }
                    onClick={() => handleNavClick(i)}
                    aria-current={i === activeIndex ? "true" : undefined}>
                    <h6>{p.title}</h6>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.rightPane} ref={containerRef}>
            <div className={styles.panelsContainer}>
              {items.map((p, i) => (
                <section
                  key={i}
                  id={`project-panel-${i}`}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className={styles.panel}>
                  <div className={styles.panelInner}>{p.element}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Projects;
