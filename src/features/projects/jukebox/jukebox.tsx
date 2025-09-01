import React from "react";
import TechSlider from "../../../components/tech-slider";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import jukeboxImage from "../images/jukebox.png";
import styles from "./jukebox.module.css";

const Jukebox: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section ref={sectionRef} className={styles.projectSection} id="jukebox">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Security Toolkit</span>
          <h1 className={styles.title}>Jukebox</h1>
          <p className={styles.subtitle}>
            Wi‑Fi reconnaissance and WPA/WPA2 workflow automation
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <div className={styles.deviceMockup}>
              <div className={styles.deviceBezel}>
                <img src={jukeboxImage} alt="Jukebox project" />
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <p>
              Interactive Wi‑Fi security toolkit that streamlines reconnaissance
              and attack workflows with a practical, operator‑friendly UI.
            </p>
            <TechSlider icons={["python", "linux", "bash"]} speed={40} />
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/jukebox"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Jukebox project on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jukebox;
