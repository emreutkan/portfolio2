import React, { useState } from "react";
import TechSlider from "../../components/tech-slider";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import styles from "./experience.module.css";

const Experience: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState(false);

  const skillData = {
    frontend: {
      title: "Frontend",
      technologies: ["typescript", "javascript", "react", "redux"],
      experienceHistory: [
        {
          project: "Freshdeal website",
          date: "2024-2025",

        },
        {
          project: "Freshdeal Business Website",
          date: "2024-2025",

        },
        {
          project: "Portfolio Website",
          date: "2025",
        },
        {
          project: "IMDB Clone (at University)",
          date: "2025"
        },
        {
          Project: "Fitrack",
          date: "2025",
        }
      ]
    },
    backend: {
      title: "Backend",
      technologies: ["python", "mongodb", "redis"],
      experienceHistory: [
        {
          project: "Freshdeal Backend",
          date: "2024-2025",
        },
        {
          project: "Short Term Stay company backend (at Universiy)",
          date: "2024",
        },
        {
          project: "IMDB Clone Backend (at University)",
          date: "2025",
        },
        {
          project: "Fitrack Backend",
          date: "2025",
        },

      ]
    },
    mobile: {
      title: "Mobile",
      technologies: ["react-native", "expo"],
      experienceHistory: [
        {
          project: "Freshdeal Mobile App",
          date: "2024-2025",
        },
        {
          project: "pharmacies nearby  (in development)",
          date: "2025",
        },
        {
          project: "Fitrack (in development)",
          date: "2025",
        },
        {
          project:  "Sleep Tracker (in development)",
        }

      ]
    },
    tools: {
      title: "Tools",
      technologies: ["git", "figma", "jira"],
      experienceHistory: [
        {
          project: "Freshdeal",
          date: "2024",
          description: "I used jira on the Freshdeal project.",
        },

      ]
    },
    os: {
      title: "Operating Systems",
      technologies: ["bash", "linux", "azure"],
    },
  };

  const { ref: sectionRef } = useScrollAnimation({ threshold: 0.1 });
  const { ref: experienceRef, isInView: experienceInView } = useScrollAnimation(
    { threshold: 0.2 }
  );
  const { ref: educationRef, isInView: educationInView } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: certificatesRef, isInView: certificatesInView } =
    useScrollAnimation({ threshold: 0.2 });

  const experienceData = [
    {
      location: "Ankara, Turkiye",
      remote: true,
      title: "Internship",
      company: "Bilishim Cyber Security and Artificial Intelligence",
    },
    {
      location: "Ocean City, New Jersey, United States",
      remote: false,
      title: "Front Desk Clerk",
      company: "The Cove Hotel",
    },
    {
      location: "Ocean City, New Jersey, United States",
      remote: false,
      title: "Barista",
      company: "DUNKIN'",
    },
    {
      location: "Ocean City, New Jersey, United States",
      remote: false,
      title: "Ride Operator",
      company: "Gillian's Wonderland Pier",
    },
    {
      location: "Izmir, Turkiye",
      remote: false,
      title: "Internship",
      company: "BNR Bilgi Teknolojileri",
    },
  ];

  const educationData = [
    {
      title: "Software Engineering",
      institution: "Yasar University",
      duration: "2022 - 2025",
    },
    {
      title: "Computer Programming",
      institution: "Yasar University",
      duration: "2020 - 2022",
    },
  ];

  const certificateData = [
    {
      title: "Google Cybersecurity Professional Certificate",
    },
    {
      title: "Google IT Support Professional Certificate",
    },
    {
      title: "IBM Web Development Essentials",
    },
    {
      title: "IBM Git and GitHub Essentials",
    },
    {
      title: "IBM Introduction to Cloud Computing",
    },
    {
      title: "CISCO Introduction to Cybersecurity",
    },
  ];

  const buildCertificateItem = (
    item: { title: string },
    isInView: boolean,
    index: number
  ) => (
    <div
      className={`${styles.certificateItem} ${
        isInView ? styles.animateItem : ""
      }`}
      data-index={index}>
      <div className={styles.miniCircle}> </div>
      <div className={styles.certificateData}> {item.title} </div>
    </div>
  );

  const buildExperienceItem = (
    item: {
      location: string;
      remote: boolean;
      title: string;
      company: string;
    },
    isLast: boolean = false,
    isInView: boolean,
    index: number
  ) => (
    <div
      className={`${styles.Item} ${isInView ? styles.animateItem : ""}`}
      data-index={index}>
      <div>
        <div className={styles.circle}></div>
        {!isLast && <div className={styles.VerticalLine}></div>}
      </div>
      <div className={styles.Details}>
        <p className={styles.experienceTitle}>
          {item.location} {item.remote ? "- Remote" : ""}
        </p>
        <p>{item.company}</p>
        <p>{item.title}</p>
      </div>
    </div>
  );

  const buildEducationItem = (
    item: {
      title: string;
      institution: string;
      duration: string;
    },
    isLast: boolean = false,
    isInView: boolean,
    index: number
  ) => (
    <div
      className={`${styles.Item} ${isInView ? styles.animateItem : ""}`}
      data-index={index}>
      <div>
        <div className={styles.circle}></div>
        {!isLast && <div className={styles.VerticalLine}></div>}
      </div>
      <div className={styles.Details}>
        <p className={styles.Title}>{item.title}</p>
        <p>{item.institution}</p>
        <p>{item.duration}</p>
      </div>
    </div>
  );
  return (
    <section
      id="experience"
      className={styles.experienceSection}
      ref={sectionRef}>
      <div className={styles.experienceEducationContainer}>
        <div ref={experienceRef}>
          <h2
            className={`${styles.sectionTitle} ${
              experienceInView ? styles.animate : ""
            }`}>
            Experience
          </h2>
          <div className={styles.experienceList}>
            {experienceData.map((item, index) => (
              <React.Fragment key={index}>
                {buildExperienceItem(
                  item,
                  index === experienceData.length - 1,
                  experienceInView,
                  index
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div ref={educationRef}>
          <h2
            className={`${styles.sectionTitle} ${
              educationInView ? styles.animate : ""
            }`}>
            Education
          </h2>
          <div className={styles.educationList}>
            {educationData.map((item, index) => (
              <React.Fragment key={index}>
                {buildEducationItem(
                  item,
                  index === educationData.length - 1,
                  educationInView,
                  index
                )}
              </React.Fragment>
            ))}
          </div>
          <div ref={certificatesRef}>
            <h2
              className={`${styles.certificateTitle} ${
                certificatesInView ? styles.animate : ""
              }`}>
              Certificates
            </h2>
            <div className={styles.certificateList}>
              {certificateData.map((item, index) => (
                <React.Fragment key={index}>
                  {buildCertificateItem(item, certificatesInView, index)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.skillsContainer}>
        <h4 className={styles.SkillsTitle}>Skills</h4>
        <div className={styles.skillsGrid}>
          {Object.entries(skillData).map(([key, skill]) => (
            <div
              key={key}
              className={styles[`${key}Skills`]}
              onMouseEnter={() => {
                setHoveredSkill(true);
              }}
              onMouseLeave={() => {
                setHoveredSkill(false);
              }}>
              <div className={styles.skillHeader}>
                <h4>{skill.title}</h4>
              </div>

              {hoveredSkill && (
                <div className={styles.experienceHistory}>
                  {skill.experienceHistory?.map((item, index) => (
                    <div key={index}>
                      <h5>{item.project}</h5>
                      <p>{item.date}</p>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.techSliderContainer}>
                <TechSlider
                  icons={skill.technologies}
                  size="small"
                  speed={20 + Math.random() * 20}
                  showTooltips={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Experience;
