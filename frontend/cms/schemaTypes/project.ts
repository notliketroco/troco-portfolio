import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Proyectos',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título del proyecto',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'Branding', value: 'Branding' },
                    { title: 'Diseño Web', value: 'Diseño Web' },
                    { title: 'Diseño UX/UI', value: 'Diseño UX/UI' },
                    { title: 'Empaques', value: 'Empaques' },
                ],
            },
        }),
        defineField({
            name: 'client',
            title: 'Cliente',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Fecha',
            type: 'datetime',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Imagen principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'images',
            title: 'Galería de imágenes',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'featured',
            title: '¿Destacado en Home?',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'thumbnail',
        }
    }
})
