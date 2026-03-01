"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index }) {
    // Datos de ejemplo para cuando no hay conexión con Strapi
    const defaultProject = {
        id: index,
        title: `Proyecto ${index + 1}`,
        slug: `proyecto-${index + 1}`,
        category: "branding",
        thumbnail: null,
    };

    const data = project || defaultProject;

    // Calcular fila para el desfase (3 columnas por fila)
    const row = Math.floor(index / 3);

    return (
        <motion.article
            className={styles.card}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.4,
                delay: row * 0.15
            }}
        >
            <Link href={`/projects/${data.slug}`} className={styles.link}>
                <motion.div
                    className={styles.imageWrapper}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className={styles.imagePlaceholder}>
                        {data.thumbnail ? (
                            <Image
                                src={data.thumbnail}
                                alt={data.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <div className={styles.placeholder}>
                                <span>{data.title.charAt(0)}</span>
                            </div>
                        )}
                    </div>

                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className={styles.viewProject}>Ver proyecto</span>
                    </motion.div>
                </motion.div>

                <div className={styles.info}>
                    <span className={styles.category}>{data.category}</span>
                    <h3 className={styles.title}>{data.title}</h3>
                </div>
            </Link>
        </motion.article>
    );
}
