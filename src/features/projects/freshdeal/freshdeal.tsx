import React from "react";
import { useContentReveal } from "../../../hooks/useContentReveal";
import { usePhoneTransform } from "../../../hooks/usePhoneTransform";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import { useTitleTransform } from "../../../hooks/useTitleTransform";
import styles from "./freshdeal.module.css";

// Import SVG assets
import accountsSvg from "../../../assets/freshdeal_accounts.svg";
import achievementsSvg from "../../../assets/freshdeal_achievements.svg";
import addressSelectionSvg from "../../../assets/freshdeal_address_selection.svg";
import freshdealsSvg from "../../../assets/freshdeal_freshdeals.svg";
import restaurantsSvg from "../../../assets/freshdeal_restaurants.svg";
import restaurantsMapSvg from "../../../assets/freshdeal_restaurants_on_map.svg";
import IPhoneMockup from "../../../components/iphone-mockup";

const Freshdeal: React.FC = () => {
  // Use the separated hooks
  const { sectionRef } = useSectionRounding();
  const { titleRef } = useTitleTransform();
  const { phoneRef } = usePhoneTransform();
  const { contentWrapperRef } = useContentReveal(titleRef);

  const appImages = [
    {
      src: addressSelectionSvg,
      alt: "Freshdeal App - Address Selection",
    },
    {
      src: accountsSvg,
      alt: "Freshdeal App - Accounts",
    },
    {
      src: achievementsSvg,
      alt: "Freshdeal App - Achievements",
    },
    {
      src: freshdealsSvg,
      alt: "Freshdeal App - Fresh Deals",
    },
    {
      src: restaurantsSvg,
      alt: "Freshdeal App - Restaurants",
    },
    {
      src: restaurantsMapSvg,
      alt: "Freshdeal App - Restaurants on Map",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={styles.freshdealSection}
      id="freshdeal">
      <div>
        <div className={styles.initialContainer}>
          <div ref={titleRef} className={styles.initialTitle}>
            <h1>FRESHDEAL</h1>
          </div>

          <div ref={phoneRef} className={styles.initialPhone}>
            <IPhoneMockup images={appImages} />
          </div>
        </div>
        <div className={styles.container}>
          {/* Content panel - slides up from below */}
          <div ref={contentWrapperRef} className={styles.contentWrapper}>
            <div className={styles.contentSide}>
              <div className={styles.header}>
                <span className={styles.projectLabel}>Mobile App</span>
                <h1 className={styles.title}>Freshdeal</h1>
                <p className={styles.subtitle}>
                  Modern food delivery experience
                </p>
              </div>

              <div className={styles.description}>
                <div className={styles.feature}>
                  <h3>🍕 Food Delivery Platform</h3>
                  <p>
                    Connect users with local restaurants through an intuitive
                    interface and real-time order tracking system.
                  </p>
                </div>

                <div className={styles.feature}>
                  <h3>📱 Mobile-First Design</h3>
                  <p>
                    Browse menus, place orders, and track deliveries with
                    features like address selection and achievement tracking.
                  </p>
                </div>

                <div className={styles.feature}>
                  <h3>🎯 Seamless Experience</h3>
                  <p>
                    Enjoy favorite meals from the comfort of home with a
                    streamlined ordering and delivery process.
                  </p>
                </div>
              </div>

              <div className={styles.techStack}>
                <h4>Technologies Used</h4>
                <div className={styles.techTags}>
                  <span className={styles.techTag}>React Native</span>
                  <span className={styles.techTag}>TypeScript</span>
                  <span className={styles.techTag}>Node.js</span>
                  <span className={styles.techTag}>MongoDB</span>
                  <span className={styles.techTag}>Socket.io</span>
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  href="https://github.com/yourusername/freshdeal"
                  className={styles.githubButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Freshdeal project on GitHub">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Freshdeal;
