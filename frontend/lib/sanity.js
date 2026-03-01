import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '4i7p0g32',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Wrapper con timeout para evitar cuelgues si Sanity no responde
async function fetchWithTimeout(query, params = {}, timeoutMs = 12000) {
  try {
    const result = await Promise.race([
      client.fetch(query, params),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Sanity timeout')), timeoutMs)
      )
    ])
    return result
  } catch (err) {
    console.warn('Sanity fetch failed or timed out:', err.message)
    return null
  }
}

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return null
  return builder.image(source)
}

// Helper functions to fetch data
export async function getProjects() {
  return fetchWithTimeout(`*[_type == "project"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    "thumbnail": thumbnail.asset->url,
    "images": images[].asset->url,
    featured
  }`)
}

export async function getFeaturedProjects() {
  return fetchWithTimeout(`*[_type == "project" && featured == true] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    "thumbnail": thumbnail.asset->url
  }[0...3]`)
}

export async function getProjectBySlug(slug) {
  return fetchWithTimeout(`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    client,
    date,
    "thumbnail": thumbnail.asset->url,
    "images": images[].asset->url
  }`, { slug })
}

export async function getAbout() {
  return fetchWithTimeout(`*[_type == "about"][0] {
    name,
    title,
    bio,
    "photo": photo.asset->url,
    "skills": skills[@ != ""],
    experience[] {
      year,
      company,
      role
    }
  }`)
}

export async function getServices() {
  return fetchWithTimeout(`*[_type == "service"] | order(order asc, _createdAt asc) {
    title,
    description,
    icon
  }`)
}

export async function getSiteConfig() {
  return fetchWithTimeout(`*[_type == "siteConfig"][0]`)
}
