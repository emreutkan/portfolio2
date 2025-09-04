import React from "react";
import TechSlider from "../../../components/tech-slider";
import qrCodeGeneratorImage from "../images/qr.png";
import styles from "./qrCodeGenerator.module.css";

const QRCodeGenerator: React.FC = () => {
  return (
    <section className={styles.projectSection} id="qr-code-generator">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>QR Code Generator</h2>

            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/qr-code-generator"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View QR Code Generator project on GitHub">
                View on GitHub
              </a>
              <a
                href="https://qr-code-generator-pearl-ten.vercel.app/"
                className={styles.vercelButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View QR Code Generator project on GitHub">
                View on Vercel
              </a>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Made with TypeScript. It supports tons of content types (URLs, Wi-Fi, socials,
              events, apps, etc.), live previews, ECC controls, custom colors,
              and one-click PNG download. Private and easy to use.
            </p>
            <TechSlider icons={["typescript"]} speed={40} />
          </div>
        </div>
      </div>
      <div className={styles.deviceMockup}>
        <div className={styles.browserHeader}>
          <div className={styles.browserControls}>
            <div className={styles.browserButton}></div>
            <div className={styles.browserButton}></div>
            <div className={styles.browserButton}></div>
          </div>
          <div className={styles.addressBar}>
            <span className={styles.addressText}>
              https://qr-code-generator-pearl-ten.vercel.app/
            </span>
          </div>
        </div>
        <div className={styles.browserContent}>
          <img src={qrCodeGeneratorImage} alt="QR Code Generator project" />
        </div>
      </div>
    </section>
  );
};

export default QRCodeGenerator;
