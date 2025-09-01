import React from "react";
import TechSlider from "../../../components/tech-slider";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import citrusImage from "../images/citrus.png";
import styles from "./citrus.module.css";

const Citrus: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section ref={sectionRef} className={styles.projectSection} id="citrus">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Evil Twin Framework</span>
          <h1 className={styles.title}>Citrus</h1>
          <p className={styles.subtitle}>
            Automated AP + captive portal tooling
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <div className={styles.browserMockup}>
              <div className={styles.browserHeader}>
                <div className={styles.browserButtons}>
                  <span className={styles.browserButton}></span>
                  <span className={styles.browserButton}></span>
                  <span className={styles.browserButton}></span>
                </div>
                <div className={styles.addressBar}>
                  <span>citrus.local</span>
                </div>
              </div>
              <div className={styles.browserContent}>
                <img src={citrusImage} alt="Citrus project" />
              </div>
            </div>
          </div>

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
    </section>
  );
};

export default Citrus;
