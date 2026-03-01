import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'Sobre Mí',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre',
            type: 'string',
        }),
        defineField({
            name: 'title',
            title: 'Roles / Título',
            description: 'Ej: Diseñador Gráfico | Diseñador de Marcas',
            type: 'string',
        }),
        defineField({
            name: 'bio',
            title: 'Párrafo principal (bio)',
            description: 'Texto que aparece en la sección de presentación.',
            type: 'text',
        }),
        defineField({
            name: 'photo',
            title: 'Foto de perfil',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'skills',
            title: 'Software (nombre exacto)',
            description: 'Ej: Illustrator, Photoshop, Figma, Premiere Pro, InDesign, Wix, Blender',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'experience',
            title: 'Experiencia Laboral',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'experienceItem',
                    title: 'Trabajo',
                    fields: [
                        { name: 'year', title: 'Año', type: 'string' },
                        { name: 'company', title: 'Empresa', type: 'string' },
                        { name: 'role', title: 'Cargo / Modalidad', type: 'string' },
                    ],
                    preview: {
                        select: { title: 'company', subtitle: 'role' }
                    }
                }
            ],
        }),
    ],
})
