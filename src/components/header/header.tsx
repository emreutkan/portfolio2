import React, { useEffect, useState } from "react";
import { useScrollVisibility } from "../../hooks/useScrollVisibility";
import { scrollToSection } from "../../utils/scrollControls";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const isVisible = useScrollVisibility(
    typeof window !== "undefined" ? window.innerHeight * 0.8 : 600
  );
  const [isFreshdealInView, setIsFreshdealInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const setupIntersectionObserver = (element: Element) => {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsFreshdealInView(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
        }
      );
      intersectionObserver.observe(element);
    };

    const existing = document.getElementById("freshdeal");
    if (existing) {
      setupIntersectionObserver(existing);
    } else {
      mutationObserver = new MutationObserver(() => {
        const el = document.getElementById("freshdeal");
        if (el) {
          setupIntersectionObserver(el);
          if (mutationObserver) mutationObserver.disconnect();
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (intersectionObserver) intersectionObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    scrollToSection(target, -80); // -80px offset for header height
  };

  const shouldShowHeader = isVisible && !isFreshdealInView;

  return (
    <header
      className={`${styles.headerContainer} ${
        shouldShowHeader ? styles.visible : styles.hidden
      }`}>
      <h1 className={styles.headerName}>Irfan Emre Utkan</h1>
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li className={styles.navItem}>
            <a
              href="#home"
              aria-label="Navigate to About me section"
              onClick={(e) => handleNavClick(e, "#home")}>
              About me
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#projects"
              aria-label="Navigate to Projects section"
              onClick={(e) => handleNavClick(e, "#projects")}>
              Projects
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#contact"
              aria-label="Navigate to Contact section"
              onClick={(e) => handleNavClick(e, "#contact")}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
