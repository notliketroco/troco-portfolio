"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaBehance, FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "Instagram", href: "https://www.instagram.com/trocovisual", Icon: FaInstagram, color: "#E4405F" },
        { name: "Behance", href: "https://www.behance.net/trocovisual", Icon: FaBehance, color: "#1769FF" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/carlos-troconis/", Icon: FaLinkedinIn, color: "#0A66C2" },
        { name: "Upwork", href: "https://www.upwork.com/freelancers/~0108988825543a5374", Icon: SiUpwork, color: "#6FDA44" },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <motion.div
                    className={styles.brand}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/images/logo-footer.svg"
                            alt="Troco"
                            width={200}
                            height={70}
                            className={styles.logoImage}
                        />
                    </Link>
                    <p className={styles.tagline}>Diseño que conecta</p>
                </motion.div>

                <motion.div
                    className={styles.links}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h4>Navegación</h4>
                    <Link href="/">Inicio</Link>
                    <Link href="/projects">Proyectos</Link>
                    <Link href="/about">Sobre mi</Link>
                    <Link href="/contact">Contacto</Link>
                </motion.div>

                <motion.div
                    className={styles.social}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
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
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 8,
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15
                                }}
                                style={{ "--icon-color": link.color }}
                            >
                                <link.Icon />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className={styles.contact}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h4>Contacto</h4>
                    <a href="mailto:hola@troco.page">hola@troco.page</a>
                    <a href="mailto:troco.art@gmail.com">troco.art@gmail.com</a>
                </motion.div>
            </div>

            <div className={styles.bottom}>
                <p>© {currentYear} Troco. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
