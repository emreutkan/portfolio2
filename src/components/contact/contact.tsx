import React, { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import styles from "./contact.module.css";

const Contact: React.FC = () => {
  const { ref: contactRef, isInView: contactInView } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <section className={styles.contactSection} id="contact" ref={contactRef}>
      <div className={styles.container}>
        <div className={`${styles.contactContent} ${contactInView ? styles.animate : ''}`}>
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>Let's Work Together</h2>
            <p className={styles.sectionDescription}>
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>📧</div>
                <div className={styles.methodInfo}>
                  <h3>Email</h3>
                  <a href="mailto:emre@example.com">emre@example.com</a>
                </div>
              </div>
              
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>💼</div>
                <div className={styles.methodInfo}>
                  <h3>LinkedIn</h3>
                  <a href="https://linkedin.com/in/emreutkan" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/emreutkan
                  </a>
                </div>
              </div>
              
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>🐙</div>
                <div className={styles.methodInfo}>
                  <h3>GitHub</h3>
                  <a href="https://github.com/emreutkan" target="_blank" rel="noopener noreferrer">
                    github.com/emreutkan
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={styles.textarea}
                  required
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
