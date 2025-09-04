import React from "react";
import TechSlider from "../../../components/tech-slider";
import citrusImage from "../images/citrus.png";
import styles from "./citrus.module.css";

const Citrus: React.FC = () => {
  return (
    <section className={styles.projectSection} id="citrus">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Evil Twin Framework</span>
          <h2 className={styles.title}>Citrus</h2>
          <p className={styles.subtitle}>
            Automated AP + captive portal tooling
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Automated Evil Twin framework with dnsmasq/hostapd integration and
              optional captive portal deployment for realistic Wi‑Fi testing.
            </p>
            <TechSlider icons={["python", "linux", "bash"]} speed={40} />
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/citrus"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Citrus project on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.media}>
        <div className={styles.browserContent}>
          <img src={citrusImage} alt="Citrus project" />
        </div>
      </div>
    </section>
  );
};

export default Citrus;
