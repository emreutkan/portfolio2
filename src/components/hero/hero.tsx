import React from "react";
import styles from "./hero.module.css";

const Hero: React.FC = () => {
  const technologies = [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "React Native",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Expo",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Linux",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    },
    {
      name: "Bash",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    },
    {
      name: "Azure",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    },
    {
      name: "Google Cloud",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Vite",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Express",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
  ];

  return (
    <section className={styles.heroSection} id="home">
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.titleContainer}>
            <h1 className={styles.greeting}>Hello, I'm</h1>
            <h2 className={styles.name}>Irfan Emre Utkan</h2>
            <h3 className={styles.title}>Full Stack Developer</h3>
          </div>

          <p className={styles.description}>
            I create beautiful, responsive web applications with modern
            technologies. Passionate about clean code, user experience, and
            bringing ideas to life through innovative solutions.
          </p>

          <div className={styles.ctaButtons}>
            <a href="#projects" className={styles.primaryBtn}>
              View My Work
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              Get In Touch
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
              <div className={styles.profilePlaceholder}>
                {/* You can replace this with an actual image */}
                <span className={styles.profileInitials}>EU</span>
              </div>
            </div>
            <div className={styles.floatingElements}>
              <div className={styles.floatingElement} data-type="react">
                ⚛️
              </div>
              <div className={styles.floatingElement} data-type="typescript">
                📘
              </div>
              <div className={styles.floatingElement} data-type="nodejs">
                🟢
              </div>
              <div className={styles.floatingElement} data-type="database">
                🗄️
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.techCarousel}>
        <div className={styles.carouselTrack}>
          {technologies.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className={styles.techItem}>
              <img
                src={tech.logo}
                alt={tech.name}
                className={styles.techLogo}
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {technologies.map((tech, index) => (
            <div
              key={`${tech.name}-duplicate-${index}`}
              className={styles.techItem}>
              <img
                src={tech.logo}
                alt={tech.name}
                className={styles.techLogo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
