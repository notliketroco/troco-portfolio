"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import styles from "./FAQ.module.css";

const faqData = [
    {
        question: "¿Cuál es tu proceso de trabajo?",
        answer: "Mi proceso incluye: 1) Briefing inicial para entender tus necesidades, 2) Investigación y conceptualización, 3) Desarrollo de propuestas, 4) Revisiones y ajustes, 5) Entrega final con todos los archivos necesarios."
    },
    {
        question: "¿Cuánto tiempo toma un proyecto?",
        answer: "Depende de la complejidad. Un logotipo puede tomar 1-2 semanas, una identidad completa 3-4 semanas, y proyectos de UI/UX pueden variar de 2-6 semanas."
    },
    {
        question: "¿Cuáles son tus métodos de pago?",
        answer: "Acepto transferencias bancarias, PayPal, y pagos a través de Upwork. Generalmente trabajo con un 50% de anticipo y 50% al finalizar."
    },
    {
        question: "¿Ofreces revisiones ilimitadas?",
        answer: "Incluyo un número razonable de revisiones (generalmente 2-3 rondas) en mis proyectos. Revisiones adicionales se pueden acordar según las necesidades del proyecto."
    },
    {
        question: "¿Trabajas con clientes internacionales?",
        answer: "¡Sí! Trabajo con clientes de todo el mundo de forma remota. La comunicación puede ser por email, videollamadas o chat según tu preferencia."
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Preguntas <span>frecuentes</span></h2>
                    <p>Respuestas a las dudas más comunes sobre mis servicios</p>
                </motion.div>

                <div className={styles.faqList}>
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <button
                                className={styles.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{item.question}</span>
                                <motion.span
                                    className={styles.icon}
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <HiChevronDown />
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        className={styles.faqAnswer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
