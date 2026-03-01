import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteConfig',
    title: 'Site Configuration',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'social',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'instagram', type: 'url', title: 'Instagram URL' },
                { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
                { name: 'behance', type: 'url', title: 'Behance URL' },
            ]
        }),
    ],
})
