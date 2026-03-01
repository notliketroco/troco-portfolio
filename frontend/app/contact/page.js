"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock } from "react-icons/hi2";
import { FaInstagram, FaBehance, FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import styles from "./page.module.css"; import { useForm, ValidationError } from '@formspree/react';

export default function ContactPage() {
    const [state, handleSubmit] = useForm("xjkgqvwp"); // Usa el Form ID provisto
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [currentTime, setCurrentTime] = useState(null);
    // Reloj local
    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date, timezone) => {
        if (!date) return { time: "--:--", period: "" };
        const options = {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: timezone,
        };
        const formatted = date.toLocaleTimeString("en-US", options);
        const [time, period] = formatted.split(" ");
        return { time, period };
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const socialLinks = [
        { name: "Instagram", href: "https://www.instagram.com/trocovisual", Icon: FaInstagram },
        { name: "Behance", href: "https://www.behance.net/trocovisual", Icon: FaBehance },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/carlos-troconis/", Icon: FaLinkedinIn },
        { name: "Upwork", href: "https://www.upwork.com/freelancers/~0108988825543a5374", Icon: SiUpwork },
    ];

    const venezuelaTime = formatTime(currentTime, "America/Caracas");
    const visitorTime = formatTime(currentTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Hablemos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        ¿Tienes un proyecto en mente? Me encantaría escucharte.
                    </motion.p>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <motion.div
                            className={styles.contactInfo}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2>Información de contacto</h2>

                            <div className={styles.infoItem}>
                                <span className={styles.icon}><HiOutlineEnvelope /></span>
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:hola@troco.page">hola@troco.page</a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.icon}><HiOutlineMapPin /></span>
                                <div>
                                    <h4>Ubicación</h4>
                                    <p>Venezuela</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.icon}><HiOutlineClock /></span>
                                <div>
                                    <h4>Disponibilidad</h4>
                                    <p className={styles.availability}>
                                        Lunes a Viernes<br />
                                        9:00 <span>AM</span> - 6:00 <span>PM</span>
                                    </p>
                                </div>
                            </div>

                            {/* Live Time Section */}
                            <div className={styles.timeSection}>
                                <h4>Hora actual</h4>
                                <div className={styles.timeZones}>
                                    <div className={styles.timeZone}>
                                        <span className={styles.timeLabel}>Mi hora (Venezuela)</span>
                                        <p className={styles.liveTime}>
                                            {venezuelaTime.time} <span>{venezuelaTime.period}</span>
                                        </p>
                                    </div>
                                    <div className={styles.timeZone}>
                                        <span className={styles.timeLabel}>Tu hora local</span>
                                        <p className={styles.liveTime}>
                                            {visitorTime.time} <span>{visitorTime.period}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.social}>
                                <h4>Sígueme</h4>
                                <div className={styles.socialIcons}>
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.socialIcon}
                                            aria-label={link.name}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <link.Icon />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className={styles.formWrapper}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {state.succeeded ? (
                                <motion.div
                                    className={styles.successMessage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <span className={styles.successIcon}>✓</span>
                                    <h3>¡Mensaje enviado!</h3>
                                    <p>Gracias por contactarme. Te responderé pronto.</p>
                                    <button
                                        className={styles.resetBtn}
                                        onClick={() => window.location.reload()}
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject">Asunto</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="¿De qué quieres hablar?"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Mensaje</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Cuéntame sobre tu proyecto..."
                                        />
                                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={state.submitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {state.submitting ? "Enviando..." : "Enviar mensaje"}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
