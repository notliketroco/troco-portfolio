const { createClient } = require('next-sanity');

const client = createClient({
    projectId: '4i7p0g32',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function debugData() {
    console.log('--- Debugging Sanity Data ---');

    // 1. Fetch Services
    try {
        const services = await client.fetch(`*[_type == "service"] {
      title,
      icon,
      "order": order
    }`);
        console.log('\nPlease check SERVICES icons:');
        services.forEach(s => {
            console.log(`- Service: "${s.title}" | Icon Field: "${s.icon}"`);
        });
    } catch (err) {
        console.error('Error fetching services:', err.message);
    }

    // 2. Fetch Projects
    try {
        const projects = await client.fetch(`*[_type == "project"] {
      title,
      "slug": slug.current
    }`);
        console.log('\nPlease check PROJECTS slugs:');
        projects.forEach(p => {
            console.log(`- Project: "${p.title}" | Slug: "${p.slug}"`);
        });
    } catch (err) {
        console.error('Error fetching projects:', err.message);
    }
}

debugData();
