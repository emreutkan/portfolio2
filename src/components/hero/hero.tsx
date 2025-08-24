import React from "react";
import styles from "./hero.module.css";

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    document
      .querySelector("#projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.heroSection} id="home">
      <div className={styles.aurora} />
      <div className={styles.noise} />
      <div className={styles.heroContent}>
        <h1 className={styles.name}>Irfan&nbsp;Emre&nbsp;Utkan</h1>
        <h3 className={styles.title}>Software Engineer</h3>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>

        <div className={styles.ctaRow}>
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
