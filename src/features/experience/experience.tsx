import React from "react";
import styles from "./experience.module.css";

const Experience: React.FC = () => {
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

  const buildCertificateItem = (item: { title: string }) => (
    <div className={styles.certificateItem}>
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
    isLast: boolean = false
  ) => (
    <div className={styles.Item}>
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
    isLast: boolean = false
  ) => (
    <div className={styles.Item}>
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
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.experienceEducationContainer}>
        <div>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experienceData.map((item, index) => (
              <React.Fragment key={index}>
                {buildExperienceItem(item, index === experienceData.length - 1)}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationList}>
            {educationData.map((item, index) => (
              <React.Fragment key={index}>
                {buildEducationItem(item, index === educationData.length - 1)}
              </React.Fragment>
            ))}
          </div>
          <h2 className={styles.certificateTitle}>Certificates</h2>
          <div className={styles.certificateList}>
            {certificateData.map((item, index) => (
              <React.Fragment key={index}>
                {buildCertificateItem(item)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
