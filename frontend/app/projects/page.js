"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import styles from "./page.module.css";
import { getProjects } from "@/lib/sanity";

const categories = ["Todos", "Branding", "Diseño Web", "Diseño UX/UI", "Empaques"];

const DEMO_PROJECTS = [
    { _id: "d1", title: "Identidad Visual — Marca Premium", slug: "marca-premium", description: "Desarrollo de identidad visual completa para marca de lujo.", category: "Branding", thumbnail: null },
    { _id: "d2", title: "Rediseño de Logotipo", slug: "rediseno-logotipo", description: "Modernización del logotipo y sistema gráfico corporativo.", category: "Branding", thumbnail: null },
    { _id: "d3", title: "Packaging — Producto Gourmet", slug: "packaging-gourmet", description: "Diseño de empaque para línea de productos premium.", category: "Empaques", thumbnail: null },
    { _id: "d4", title: "Sitio Web Corporativo", slug: "web-corporativo", description: "Diseño y desarrollo de sitio web para empresa de servicios.", category: "Diseño Web", thumbnail: null },
    { _id: "d5", title: "App Móvil — Experiencia de Usuario", slug: "app-ux-ui", description: "Diseño de interfaz y flujos UX para aplicación móvil.", category: "Diseño UX/UI", thumbnail: null },
    { _id: "d6", title: "Brand Guide — Startup", slug: "brand-guide-startup", description: "Manual de marca completo para startup tecnológica.", category: "Branding", thumbnail: null },
];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [allProjects, setAllProjects] = useState(DEMO_PROJECTS);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                if (data?.length) setAllProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === "Todos"
        ? allProjects
        : (allProjects || []).filter(p => p.category === activeCategory);

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
                        Mis <span>proyectos</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Una colección de trabajos en branding, diseño digital e identidad visual.
                    </motion.p>
                </div>
            </section>

            {/* Filter Section */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.filters}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ""}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className={styles.projectsSection}>
                <div className={styles.container}>
                    <div className={styles.projectsGrid}>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={`${activeCategory}-${project._id}`}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
