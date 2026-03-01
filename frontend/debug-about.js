const { createClient } = require('next-sanity');

const client = createClient({
    projectId: '4i7p0g32',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function debugAbout() {
    console.log('--- Debugging Sanity About Data ---');
    try {
        const about = await client.fetch(`*[_type == "about"][0]`);
        console.log('About Document:', about);
        if (!about) {
            console.log("RESULT: The 'about' document does NOT exist in Sanity. This is why it loads forever.");
        } else {
            console.log("RESULT: Document exists.");
        }
    } catch (err) {
        console.error('Error fetching about:', err.message);
    }
}

debugAbout();
