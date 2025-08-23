import React from "react";
import citrusImage from "./images/citrus.png";
import evadeImage from "./images/evade.png";
import jukeboxImage from "./images/jukebox.png";
import styles from "./projects.module.css";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Freshdeal - Mobile app",
      description:
        "FreshDeal is a comprehensive multi-platform application designed to tackle food waste by connecting businesses with surplus food to consumers seeking affordable, high-quality meals. The app promotes sustainability while providing budget-friendly dining options, aligning with the UN's Sustainable Development Goals.",
      image:
        "https://raw.githubusercontent.com/FreshDealApp/FreshDealMobile/refs/heads/main/src/assets/images/logo.png",
      technologies: ["React Native", "Expo", "Redux", "TypeScript", "npm"],
      OpenSource: true,
      link: "https://github.com/freshdealapp/freshdealmobile",
    },
    {
      title: "Jukebox",
      description:
        " an interactive toolkit designed for Wi-Fi network attacks and security analysis. It automates various wireless security testing tasks including network reconnaissance, attack execution, and WPA/WPA2 password cracking.",
      image: jukeboxImage,
      technologies: ["Python", "Linux", "aircrack-ng"],
      OpenSource: true,
      link: "https://github.com/emreutkan/jukebox",
    },
    {
      title: "",
      description:
        "An Automated Evil Twin Framework designed to impersonate legitimate wireless networks with dnsmasq and hostapd. Citrus sets up a foundation for executing Man-in-the-Middle (MITM) attacks. It also has an option to deploy a captive portal using apache2, complete with a fake credentials page for phishing attacks.",
      image: citrusImage,
      technologies: ["Python", "Linux", "hostapd", "dnsmasq", "apache2"],
      OpenSource: true,
      link: "https://github.com/emreutkan/citrus",
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my projects, skills, and experiences. Built with React and styled-components for a modern, responsive design.",

      image: "path/to/portfolio-image.jpg",
      technologies: ["React", "CSS", "JavaScript"],
      OpenSource: true,
      link: "https://github.com/emreutkan/portfolio",
    },
    {
      title: "Freshdeal - Web app",
      description:
        "A web application for Freshdeal, built with React and Node.js. It features a modern UI and integrates with various APIs.",
      image: "path/to/freshdeal-web-image.jpg",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      OpenSource: true,
      link: "https://github.com/emreutkan/freshdeal-web",
    },
    {
      title: "Freshdeal - Backend",
      description:
        "The backend for Freshdeal, built with Node.js and Express. It handles API requests and integrates with the database.",
      image: "path/to/freshdeal-backend-image.jpg",
      technologies: [
        "Python",
        "Flask",
        "PostgreSQL",
        "SQLAlchemy",
        "Azure",
        "Firebase",
        "Groq",
        "Machine Learning",
      ],
      OpenSource: true,
      link: "https://github.com/emreutkan/freshdeal-backend",
    },
    {
      title: "Evade",
      description:
        " a self‑decrypting encrypted payload generator used to evade antivirus detection. It encrypts a  payload and embeds runtime decryption logic so the original code is only revealed in memory at execution.",
      image: evadeImage,
      technologies: ["Python", "Windows", "Payload Encryption"],
      OpenSource: true,
      link: "https://github.com/emreutkan/evade",
    },
  ];

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.freshdealMobileContainer}>
          <div className={styles.projectContent}>
            <h2>{projects[0].title}</h2>
            <div className={styles.projectDescription}>
              <p>{projects[0].description}</p>
            </div>
            <div className={styles.projectTechnologies}>
              {projects[0].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
            </div>

            <a
              href={projects[0].link}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
        <div className={styles.freshdealWebContainer}>
          <div className={styles.projectContent}>
            <h2>{projects[0].title}</h2>
            <div className={styles.projectDescription}>
              <p>{projects[0].description}</p>
            </div>
            <div className={styles.projectTechnologies}>
              {projects[0].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
            </div>

            <a
              href={projects[0].link}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
        <div className={styles.freshdealBackendContainer}>
          <div className={styles.projectContent}>
            <h2>{projects[0].title}</h2>
            <div className={styles.projectDescription}>
              <p>{projects[0].description}</p>
            </div>
            <div className={styles.projectTechnologies}>
              {projects[0].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
            </div>
            <a
              href={projects[0].link}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
        <div className={styles.freshdealBusinessContainer}>
          <div className={styles.projectContent}>
            <h2>{projects[0].title}</h2>
            <div className={styles.projectDescription}>
              <p>{projects[0].description}</p>
            </div>
            <div className={styles.projectTechnologies}>
              {projects[0].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
            </div>
            <a
              href={projects[0].link}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer">
              View Project
            </a>
          </div>
        </div>
        <div className={styles.jukeboxContainer}>
          <img src={projects[1].image} alt={projects[1].title} />
          <div className={styles.projectContent}>
            <h2>{projects[1].title}</h2>
            <p>{projects[1].description}</p>
            <div className={styles.projectTechnologies}>
              {projects[1].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
              <span className={styles.spacer} aria-hidden="true"></span>
              <a
                href={projects[1].link}
                target="_blank"
                rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        </div>
        <div className={styles.citrusContainer}>
          <img src={projects[2].image} alt={projects[2].title} />
          <div className={styles.projectContent}>
            <h2>{projects[2].title}</h2>
            <div className={styles.projectDescription}>
              <p>{projects[2].description}</p>
            </div>
            <div className={styles.projectTechnologies}>
              {projects[2].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
              <span className={styles.spacer} aria-hidden="true"></span>
              <a
                href={projects[2].link}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        </div>
        <div className={styles.evadeContainer}>
          <img src={projects[6].image} alt={projects[6].title} />
          <div className={styles.blur}></div>
          <div className={styles.projectContent}>
            <h2>{projects[6].title}</h2>
            <div className={styles.projectDescription}>
              <p>{projects[6].description}</p>
            </div>
            <div className={styles.projectTechnologies}>
              {projects[6].technologies.map((tech, index) => (
                <p key={index}>{tech}</p>
              ))}
              <span className={styles.spacer} aria-hidden="true"></span>
              <a
                href={projects[6].link}
                className={styles.projectLink}
                target="_blank"
                rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
