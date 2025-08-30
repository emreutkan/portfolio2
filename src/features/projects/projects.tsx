import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useMemo, useRef, useState } from "react";
import { scrollToSection } from "../../utils/scrollControls";
import Citrus from "./citrus/citrus";
import Evade from "./evade/evade";
import FreshdealBackend from "./freshdeal-backend/freshdeal-backend";
import FreshdealWeb from "./freshdeal-web/freshdeal-web";
import Freshdeal from "./freshdeal/freshdeal";
import Jukebox from "./jukebox/jukebox";
import styles from "./projects.module.css";
gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const items = useMemo(
    () => [
      {
        title: "Freshdeal - Mobile app",
        element: <Freshdeal enableAnimation={false} />,
      },
      { title: "Jukebox", element: <Jukebox /> },
      { title: "Citrus", element: <Citrus /> },
      { title: "Freshdeal - Web app", element: <FreshdealWeb /> },
      { title: "Freshdeal - Backend", element: <FreshdealBackend /> },
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
    const pinTrigger = ScrollTrigger.create({
      trigger: projectsPinRef.current,
      start: "top top", // where pinning begins
      end: "+=1000", // how long it stays pinned
      pin: true,
      pinSpacing: true,
    });
    ScrollTrigger.create({
      id: "projectsSectionPin",
      trigger: projectsRef.current,
      start: () => ScrollTrigger.getById("ProjectsWiden")!.end,
      // pin: true,
    });

    gsap.to(headerRef.current, {
      y: "-11vh",
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

  const handleNavClick = (index: number) => {
    const id = `project-panel-${index}`;
    const el = document.getElementById(id);
    if (el) {
      scrollToSection(el, 0);
    }
  };

  // Counter display (01, 02, ...)
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
        <div className={styles.counterContainer}>
          <h3>{counter}</h3>{" "}
        </div>

        <div className={styles.projectsLayout}>
          <aside className={styles.leftNav} aria-label="Project list">
            <ul className={styles.navList}>
              {items.map((p, i) => (
                <li key={i}>
                  <button
                    className={
                      i === activeIndex
                        ? `${styles.navItem} ${styles.navItemActive}`
                        : styles.navItem
                    }
                    onClick={() => handleNavClick(i)}
                    aria-current={i === activeIndex ? "true" : undefined}>
                    <span>{p.title}</span>
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
