"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
    // Animaciones para el título principal
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: (delay) => ({
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: delay,
            },
        }),
    };

    return (
        <section className={styles.hero}>
            {/* Background Elements */}
            <div className={styles.bgElements}>
                <motion.div
                    className={styles.circle1}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className={styles.circle2}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className={styles.title}>
                        {/* "¿Ya lo" aparece primero - Poppins Light, blanco */}
                        <motion.span
                            variants={fadeInVariants}
                            custom={0.3}
                            initial="hidden"
                            animate="visible"
                            className={styles.titleLight}
                        >
                            ¿Ya lo{" "}
                        </motion.span>
                        {/* "visualizaste" - Montserrat Bold, naranja */}
                        <motion.span
                            variants={fadeInVariants}
                            custom={0.8}
                            initial="hidden"
                            animate="visible"
                            className={styles.titleBold}
                        >
                            visualizaste
                        </motion.span>
                        {/* "?" - Poppins Light, blanco */}
                        <motion.span
                            variants={fadeInVariants}
                            custom={0.8}
                            initial="hidden"
                            animate="visible"
                            className={styles.titleLight}
                        >
                            ?
                        </motion.span>
                    </h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                    >
                        Diseñador gráfico en branding, identidad visual y experiencias digitales.
                    </motion.p>

                    <motion.div
                        className={styles.ctas}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                    >
                        <motion.a
                            href="/projects"
                            className={styles.btnPrimary}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ver proyectos
                        </motion.a>
                        <motion.a
                            href="/contact"
                            className={styles.btnSecondary}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contáctame
                        </motion.a>
                    </motion.div>

                    {/* Scroll indicator - debajo de los botones */}
                    <motion.div
                        className={styles.scrollIndicator}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                    >
                        <span>Scroll</span>
                        <motion.div
                            className={styles.mouseIcon}
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
