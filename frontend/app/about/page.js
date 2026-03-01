"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    SiAdobeillustrator,
    SiAdobephotoshop,
    SiAdobepremierepro,
    SiAdobeindesign,
    SiWix,
    SiBlender,
    SiFigma
} from "react-icons/si";
import { IoFlash } from "react-icons/io5";
import styles from "./page.module.css";
import { getAbout } from "@/lib/sanity";

// Mapa de iconos por nombre de software
const ICON_MAP = {
    illustrator: SiAdobeillustrator,
    photoshop: SiAdobephotoshop,
    'premiere pro': SiAdobepremierepro,
    'premiere': SiAdobepremierepro,
    indesign: SiAdobeindesign,
    wix: SiWix,
    blender: SiBlender,
    figma: SiFigma,
};

function getIcon(skillName) {
    const key = skillName.toLowerCase();
    for (const [k, Icon] of Object.entries(ICON_MAP)) {
        if (key.includes(k)) return Icon;
    }
    return IoFlash;
}

// Datos locales de fallback (se usan si Sanity no responde)
const FALLBACK_DATA = {
    name: "Carlos Troconis",
    title: "Diseñador Gráfico | Diseñador de Marcas | Diseñador de Producto con IA",
    bio: "Diseñador gráfico proactivo, detallista y empático, con formación estratégica en branding y comunicación visual. Mi comprensión de cómo cada interacción fortalece la identidad de marca me permite crear soluciones con propósito y claridad. Domino Adobe Illustrator, Photoshop, Premiere Pro e InDesign, con experiencia adicional en desarrollo web con Wix. Hablo español nativo e inglés intermedio (B1).",
    photo: null,
    skills: ["Illustrator", "Photoshop", "Premiere Pro", "InDesign", "Wix", "Blender", "Figma", "Vibe Coding"],
    experience: [
        { year: "2025", company: "Proyect C.A.", role: "Diseñador - Presencial" },
        { year: "2025", company: "TOB Corporación", role: "Pasantías - Presencial" },
        { year: "2025", company: "GPL Management", role: "Diseñador - Remoto" },
        { year: "2024", company: "Enso Technologies LTD", role: "Diseñador - Remoto" },
    ],
};

export default function AboutPage() {
    const [data, setData] = useState(FALLBACK_DATA);

    useEffect(() => {
        async function fetchAbout() {
            try {
                const sanityData = await getAbout();
                if (sanityData) {
                    // Mergeamos con fallback para campos que puedan estar vacíos en Sanity
                    setData({
                        ...FALLBACK_DATA,
                        ...sanityData,
                        // Mantener fallback si el campo está vacío en Sanity
                        skills: sanityData.skills?.length ? sanityData.skills : FALLBACK_DATA.skills,
                        experience: sanityData.experience?.length ? sanityData.experience : FALLBACK_DATA.experience,
                    });
                }
            } catch (error) {
                console.error("Error fetching about:", error);
            }
        }
        fetchAbout();
    }, []);

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <motion.div
                            className={styles.heroText}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.greeting}>Hola, soy</span>
                            <h1>{data.name}</h1>
                            <p className={styles.title}>{data.title}</p>
                            <p className={styles.bio}>{data.bio}</p>
                        </motion.div>

                        <motion.div
                            className={styles.heroImage}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className={styles.imagePlaceholder}>
                                {data.photo ? (
                                    <img src={data.photo} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                                ) : (
                                    <span>CT</span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className={styles.skillsSection}>
                <div className={styles.container}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Software
                    </motion.h2>

                    <div className={styles.softwareGrid}>
                        {data.skills.map((skillName, index) => {
                            const Icon = getIcon(skillName);
                            return (
                                <motion.div
                                    key={skillName}
                                    className={styles.softwareItem}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    <div className={styles.iconWrapper}>
                                        <Icon />
                                    </div>
                                    <span className={styles.softwareName}>{skillName}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Soft Skills & Languages */}
                    <div className={styles.extraSkills}>
                        <motion.div
                            className={styles.softSkills}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3>Soft Skills</h3>
                            <div className={styles.tags}>
                                <span>Adaptabilidad</span>
                                <span>Inteligencia Emocional</span>
                                <span>Paciencia</span>
                                <span>Creatividad</span>
                                <span>Liderazgo</span>
                                <span>Empatía</span>
                                <span>Detallista</span>
                            </div>
                        </motion.div>

                        <motion.div
                            className={styles.languages}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3>Idiomas</h3>
                            <div className={styles.languageItem}>
                                <span>Español</span>
                                <span className={styles.langLevel}>Nativo</span>
                            </div>
                            <div className={styles.languageItem}>
                                <span>Inglés</span>
                                <span className={styles.langLevel}>Intermedio (B1)</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className={styles.experienceSection}>
                <div className={styles.container}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Experiencia
                    </motion.h2>

                    <div className={styles.timeline}>
                        {data.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className={styles.timelineItem}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <span className={styles.year}>{exp.year}</span>
                                <div className={styles.expContent}>
                                    <h3>{exp.company}</h3>
                                    <p>{exp.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.ctaContent}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>¿Trabajamos juntos?</h2>
                        <p>Siempre estoy abierto a nuevos proyectos y colaboraciones.</p>
                        <motion.a
                            href="/contact"
                            className={styles.ctaBtn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contáctame
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
