import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { scrollToSection } from "../../utils/scrollControls";
import styles from "./hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    scrollToSection("#projects", -80);
  };

  const pageRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerNameRef = useRef<HTMLHeadingElement | null>(null);
  const headerNavRef = useRef<HTMLUListElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);

  // in vh
  useGSAP(() => {
    gsap.set(headerNameRef.current, {
      display: "none",
    });
    gsap.set(headerRef.current, {
      position: "absolute",
      width: "auto",
      right: "0",
      bottom: "var(--spacing-2xl)",
    });

    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: "power3.out" },
      onComplete: () => {
        // Set up ScrollTrigger animations after the initial animation completes
        gsap.to(headerRef.current, {
          width: "100vw",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "20%",
            end: "70%",
            scrub: true,
          },
        });
        gsap.to(headerRef.current, {
          position: "fixed",
          top: "var(--spacing-sm)",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "90%",
            end: "90%",
            scrub: true,
          },
        });
        gsap.to(nameRef.current, {
          // add animation power3.out
          y: "60vh",
          scale: 0.3,
          transformOrigin: "left ", // keeps it stuck to left, scales downwards

          scrollTrigger: {
            trigger: pageRef.current,
            start: "20%",
            end: "80%",
            scrub: true,
          },
        });
        gsap.to(nameRef.current, {
          position: "fixed",
          top: "calc(var(--spacing-lg) * -1)",
          y: 0,
          scrollTrigger: {
            trigger: pageRef.current,
            start: "80%",
            end: "80%",
            scrub: true,
          },
        });

        gsap.to(titleRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: pageRef.current,
            start: "30%",
            end: "35%",
            scrub: true,
          },
        });
        gsap.to(descriptionRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: pageRef.current,
            start: "30%",
            end: "35%",
            scrub: true,
          },
        });
        gsap.to(ctaRowRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: pageRef.current,
            start: "30%",
            end: "35%",
            scrub: true,
          },
        });
      },
    });

    // "rise in" = from y and 0 opacity to normal
    tl.from(nameRef.current, { y: 20, autoAlpha: 0 }, 0.1)
      .from(titleRef.current, { y: 20, autoAlpha: 0 }, 0.18)
      .from(descriptionRef.current, { y: 20, autoAlpha: 0 }, 0.26)
      .from(ctaRowRef.current, { y: 20, autoAlpha: 0 }, 0.34);
  }, []);

  return (
    <section className={styles.heroSection} id="home" ref={pageRef}>
      <div className={styles.floatingHeaderContainer} ref={headerRef}>
        <div className={styles.floatingHeader}>
          <h6 ref={headerNameRef}>Irfan Emre Utkan</h6>
          <ul className={styles.floatingNav} ref={headerNavRef}>
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home", -80);
                }}>
                About me
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#projects", -80);
                }}>
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#contact", -80);
                }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.heroContent} ref={heroContentRef}>
        <h1 className={styles.name} ref={nameRef}>
          Irfan&nbsp;Emre&nbsp;Utkan
        </h1>
        <h3 className={styles.title} ref={titleRef}>
          Software Engineer
        </h3>

        <p className={styles.description} ref={descriptionRef}>
          Passionate full-stack developer with expertise in modern web
          technologies. I create innovative, user-focused applications that
          solve real-world problems, specializing in React, TypeScript, and
          mobile development with React Native.
        </p>

        <div className={styles.ctaRow} ref={ctaRowRef}>
          <a href="#projects" className={styles.primaryBtn} data-magnetic>
            <span>View My Work</span>
            <i className={styles.shimmer} aria-hidden />
          </a>
          <a href="#contact" className={styles.secondaryBtn} data-magnetic>
            Get In Touch
          </a>
        </div>
      </div>

      <button
        className={styles.scrollIndicator}
        onClick={scrollToProjects}
        aria-label="Scroll to projects">
        <span className={styles.scrollDot} />
        <span className={styles.scrollLabel}>Scroll</span>
      </button>
    </section>
  );
};

export default Hero;
