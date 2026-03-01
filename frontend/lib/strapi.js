/**
 * Strapi API Connection Utility
 * =============================
 * Este archivo contiene todas las funciones para conectar
 * el frontend con Strapi CMS.
 */

// URL base de Strapi (cambiará en producción)
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Función helper para hacer peticiones a Strapi
 */
async function fetchFromStrapi(endpoint, options = {}) {
    const url = `${STRAPI_URL}/api${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            console.error(`Error fetching ${endpoint}:`, response.status);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

/**
 * Obtener URL completa de una imagen de Strapi
 */
export function getStrapiImageUrl(image) {
    if (!image) return null;

    // Si ya es una URL completa, devolverla
    if (image.url?.startsWith("http")) {
        return image.url;
    }

    // Si es una URL relativa, agregar la base de Strapi
    return `${STRAPI_URL}${image.url}`;
}

// ============================================
// PROYECTOS
// ============================================

/**
 * Obtener todos los proyectos
 * @param {Object} options - Opciones de filtrado
 * @param {string} options.category - Filtrar por categoría
 * @param {boolean} options.featured - Solo proyectos destacados
 */
export async function getProjects({ category, featured } = {}) {
    let endpoint = "/projects?populate=*";

    // Agregar filtros si existen
    if (category) {
        endpoint += `&filters[category][$eq]=${category}`;
    }
    if (featured) {
        endpoint += `&filters[featured][$eq]=true`;
    }

    // Ordenar por fecha descendente
    endpoint += "&sort=date:desc";

    const response = await fetchFromStrapi(endpoint);

    if (!response?.data) return [];

    // Transformar datos al formato que usamos en el frontend
    return response.data.map(project => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        featured: project.featured,
        date: project.date,
        thumbnail: project.thumbnail ? getStrapiImageUrl(project.thumbnail) : null,
        images: project.images?.map(img => getStrapiImageUrl(img)) || [],
    }));
}

/**
 * Obtener un proyecto por su slug
 */
export async function getProjectBySlug(slug) {
    const endpoint = `/projects?filters[slug][$eq]=${slug}&populate=*`;
    const response = await fetchFromStrapi(endpoint);

    if (!response?.data?.[0]) return null;

    const project = response.data[0];

    return {
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        featured: project.featured,
        date: project.date,
        client: project.client,
        services: project.services,
        thumbnail: project.thumbnail ? getStrapiImageUrl(project.thumbnail) : null,
        images: project.images?.map(img => getStrapiImageUrl(img)) || [],
    };
}

/**
 * Obtener proyectos destacados (para el home)
 */
export async function getFeaturedProjects(limit = 6) {
    const endpoint = `/projects?filters[featured][$eq]=true&populate=thumbnail&sort=date:desc&pagination[limit]=${limit}`;
    const response = await fetchFromStrapi(endpoint);

    if (!response?.data) return [];

    return response.data.map(project => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        category: project.category,
        thumbnail: project.thumbnail ? getStrapiImageUrl(project.thumbnail) : null,
    }));
}

// ============================================
// ABOUT (Sobre Mí)
// ============================================

/**
 * Obtener información del About
 */
export async function getAbout() {
    const endpoint = "/about?populate=*";
    const response = await fetchFromStrapi(endpoint);

    if (!response?.data) return null;

    const about = response.data;

    return {
        name: about.name,
        title: about.title,
        bio: about.bio,
        longBio: about.longBio,
        photo: about.photo ? getStrapiImageUrl(about.photo) : null,
        skills: about.skills || [],
        experience: about.experience || [],
    };
}

// ============================================
// SERVICIOS
// ============================================

/**
 * Obtener todos los servicios
 */
export async function getServices() {
    const endpoint = "/services?populate=*&sort=order:asc";
    const response = await fetchFromStrapi(endpoint);

    if (!response?.data) return [];

    return response.data.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
    }));
}

// ============================================
// CONFIGURACIÓN DEL SITIO
// ============================================

/**
 * Obtener configuración general del sitio
 */
export async function getSiteConfig() {
    const endpoint = "/site-config?populate=*";
    const response = await fetchFromStrapi(endpoint);

    if (!response?.data) return null;

    const config = response.data;

    return {
        siteName: config.siteName,
        tagline: config.tagline,
        email: config.email,
        phone: config.phone,
        location: config.location,
        social: config.social || {},
    };
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Verificar si Strapi está disponible
 */
export async function checkStrapiConnection() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/projects`, {
            method: "HEAD",
        });
        return response.ok;
    } catch {
        return false;
    }
}

export { STRAPI_URL };
