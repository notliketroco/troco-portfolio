const { createClient } = require('next-sanity');

const client = createClient({
    projectId: '4i7p0g32',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false, // Turn off CDN to get fresh data
});

async function testFetch() {
    console.log('Testing Sanity Connection...');
    try {
        const projects = await client.fetch('*[_type == "project"]');
        console.log('Projects found:', projects.length);
        if (projects.length > 0) {
            console.log('First project title:', projects[0].title);
        } else {
            console.log('No projects found. Did you publish?');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

testFetch();
