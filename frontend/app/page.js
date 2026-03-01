"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import FAQ from "@/components/FAQ";
import styles from "./page.module.css";
// Icons map for dynamic rendering
import * as HeroIcons from "react-icons/hi2";
import { getFeaturedProjects, getServices } from "@/lib/sanity";

// Datos de demo (se usan cuando Sanity no tiene contenido)
const DEMO_PROJECTS = [
  {
    _id: "demo-1",
    title: "Identidad Visual — Marca Premium",
    slug: "identidad-visual-marca-premium",
    description: "Desarrollo de identidad visual completa para marca de lujo.",
    category: "Branding",
    thumbnail: null,
  },
  {
    _id: "demo-2",
    title: "Rediseño de Logo — Empresa Tech",
    slug: "rediseno-logo-empresa-tech",
    description: "Modernización del logotipo y sistema gráfico corporativo.",
    category: "Logotipo",
    thumbnail: null,
  },
  {
    _id: "demo-3",
    title: "Diseño Web — Portafolio Creativo",
    slug: "diseno-web-portafolio",
    description: "Diseño y desarrollo de portafolio digital para fotógrafo.",
    category: "Diseño Web",
    thumbnail: null,
  },
];

const DEMO_SERVICES = [
  {
    title: "Branding & Identidad Visual",
    description: "Creación de marcas memorables: logo, paleta, tipografía y manual de marca.",
    icon: "HiOutlinePaintBrush",
  },
  {
    title: "Diseño Web",
    description: "Sitios web atractivos y funcionales que comunican tu esencia de marca.",
    icon: "HiOutlineComputerDesktop",
  },
  {
    title: "Diseño de Empaque",
    description: "Packaging que destaca en anaquel y conecta con el consumidor.",
    icon: "HiOutlineCube",
  },
  {
    title: "UX/UI",
    description: "Interfaces intuitivas y elegantes con foco en la experiencia del usuario.",
    icon: "HiOutlineCursorArrowRays",
  },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState(DEMO_PROJECTS);
  const [services, setServices] = useState(DEMO_SERVICES);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, servicesData] = await Promise.all([
          getFeaturedProjects(),
          getServices()
        ]);
        if (projectsData?.length) setFeaturedProjects(projectsData);
        if (servicesData?.length) setServices(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Hero />

      {/* Featured Projects Section */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              Proyectos <span>destacados</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Una selección de mis trabajos más recientes en branding,
              diseño digital e identidad visual.
            </p>
          </motion.div>
        </div>

        {/* Marquee Container - Full Width */}
        <div className={styles.marqueeContainer}>
          {featuredProjects.length > 0 ? (
            <div className={styles.marqueeTrack}>
              {/* First set of projects */}
              {featuredProjects.map((project) => (
                <div key={project._id} className={styles.marqueeItem}>
                  <ProjectCard project={project} index={0} />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {featuredProjects.map((project) => (
                <div key={`dup-${project._id}`} className={styles.marqueeItem}>
                  <ProjectCard project={project} index={0} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.loading}>
              No hay proyectos destacados. <br />
              (Asegúrate de publicar uno en el Studio y recargar)
            </div>
          )}
        </div>

        <div className={styles.container}>
          <motion.div
            className={styles.viewAll}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="/projects"
              className={styles.btnOutline}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Todos los Proyectos
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              Servicios que <span>impactan</span>
            </h2>
          </motion.div>

          <div className={styles.servicesGrid}>
            {services.length > 0 ? services.map((service, index) => {
              // Dynamic Icon Rendering
              // 1. Normalize title for flexible matching
              const titleLower = service.title ? service.title.toLowerCase() : '';

              // 2. Try exact match first, then fallback to keywords
              let IconComponent = HeroIcons[service.icon];

              if (!IconComponent) {
                if (titleLower.includes('branding') || titleLower.includes('marca') || titleLower.includes('identidad')) {
                  IconComponent = HeroIcons.HiOutlinePaintBrush;
                } else if (titleLower.includes('web') || titleLower.includes('sitio') || titleLower.includes('desarrollo')) {
                  IconComponent = HeroIcons.HiOutlineComputerDesktop;
                } else if (titleLower.includes('app') || titleLower.includes('ui') || titleLower.includes('ux') || titleLower.includes('interfaz')) {
                  IconComponent = HeroIcons.HiOutlineCursorArrowRays;
                } else if (titleLower.includes('empaque') || titleLower.includes('pack')) {
                  IconComponent = HeroIcons.HiOutlineCube;
                } else {
                  IconComponent = HeroIcons.HiOutlineSparkles; // Generic fallback
                }
              }

              return (
                <motion.div
                  key={service.title}
                  className={styles.serviceCard}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <span className={styles.serviceIcon}><IconComponent /></span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </motion.div>
              );
            }) : (
              <p>No hay servicios configurados.</p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

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
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>Hablemos sobre cómo puedo ayudarte a hacerlo realidad.</p>
            <motion.a
              href="/contact"
              className={styles.btnPrimary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Conversación
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
