import emailjs from "@emailjs/browser";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import styles from "./contact.module.css";

const Contact: React.FC = () => {
  const { ref: contactRef, isInView: contactInView } = useScrollAnimation({
    threshold: 0.2,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "Email service is not configured. Please set VITE_EMAILJS_* env vars."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: "irfanemreutkan@outlook.com",
        },
        { publicKey }
      );

      setStatus({ type: "success", message: "Message sent! I'll reply soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Failed to send. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} id="contact" ref={contactRef}>
      <div className={styles.container}>
        <div
          className={`${styles.contactContent} ${
            contactInView ? styles.animate : ""
          }`}>
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>Let's Work Together</h2>
            <p className={styles.sectionDescription}>
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, I'll try my
              best to get back to you!
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>
                  <IconMail size={28} stroke={1.5} />
                </div>
                <div className={styles.methodInfo}>
                  <h3>Email</h3>
                  <a href="mailto:irfanemreutkan@outlook.com">
                    irfanemreutkan@outlook.com
                  </a>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>
                  <IconBrandLinkedin size={28} stroke={1.5} />
                </div>
                <div className={styles.methodInfo}>
                  <h3>LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/in/irfanemreutkan/"
                    target="_blank"
                    rel="noopener noreferrer">
                    linkedin.com/in/irfanemreutkan
                  </a>
                </div>
              </div>

              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>
                  <IconBrandGithub size={28} stroke={1.5} />
                </div>
                <div className={styles.methodInfo}>
                  <h3>GitHub</h3>
                  <a
                    href="https://github.com/emreutkan"
                    target="_blank"
                    rel="noopener noreferrer">
                    github.com/emreutkan
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={styles.textarea}
                  placeholder="Tell me about your project, timeline and goals..."
                  required
                />
              </div>

              {status && (
                <div
                  className={
                    status.type === "success"
                      ? styles.statusSuccess
                      : styles.statusError
                  }>
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
