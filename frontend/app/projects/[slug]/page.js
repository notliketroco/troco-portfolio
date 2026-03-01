"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";
import { getProjectBySlug } from "@/lib/sanity";

export default function ProjectDetail({ params }) {
    const { slug } = use(params);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            console.log("Fetching project strictly for slug:", slug);
            try {
                const data = await getProjectBySlug(slug);
                console.log("Sanity response:", data);
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setIsLoading(false);
            }
        }
        if (slug) {
            fetchProject();
        } else {
            console.error("No slug parameter found in URL params");
            setIsLoading(false);
        }
    }, [slug]);

    if (isLoading) {
        return <div className={styles.main}><p style={{ textAlign: 'center', marginTop: '5rem' }}>Cargando proyecto...</p></div>;
    }

    if (!project) {
        return (
            <div className={styles.main}>
                <div className={styles.container} style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <h1>Proyecto no encontrado</h1>
                    <Link href="/projects" className={styles.btnOutline}>Volver a proyectos</Link>
                </div>
            </div>
        );
    }

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.breadcrumb}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/projects">← Volver a Proyectos</Link>
                    </motion.div>

                    <motion.span
                        className={styles.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {project.category}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </section>

            {/* Project Image */}
            <section className={styles.imageSection}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.mainImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className={styles.imagePlaceholder}>
                            {project.thumbnail ? (
                                <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                            ) : (
                                <span>{project.title.charAt(0)}</span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Info */}
            <section className={styles.infoSection}>
                <div className={styles.container}>
                    <div className={styles.infoGrid}>
                        <motion.div
                            className={styles.description}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Sobre el proyecto</h2>
                            <p>{project.description}</p>
                        </motion.div>

                        <motion.div
                            className={styles.details}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className={styles.detailItem}>
                                <h4>Cliente</h4>
                                <p>{project.client || "Confidencial"}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h4>Fecha</h4>
                                <p>{project.date ? new Date(project.date).getFullYear() : "2024"}</p>
                            </div>
                            {/* Tags or Service Categories could go here, but schema has simple string category. 
                                We can display category again or specific tags if added to schema later */}
                            <div className={styles.detailItem}>
                                <h4>Categoría</h4>
                                <div className={styles.tags}>
                                    <span className={styles.tag}>{project.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Placeholder */}
            {project.images && project.images.length > 0 && (
                <section className={styles.gallerySection}>
                    <div className={styles.container}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Galería
                        </motion.h2>
                        <div className={styles.galleryGrid}>
                            {project.images.map((imgUrl, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.galleryItem}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className={styles.galleryPlaceholder}>
                                        <img src={imgUrl} alt={`Gallery ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Next Project */}
            <section className={styles.nextProject}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span>Siguiente proyecto</span>
                        <Link href="/projects" className={styles.nextLink}>
                            Ver todos los proyectos →
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
