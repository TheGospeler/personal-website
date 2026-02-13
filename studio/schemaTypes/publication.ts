import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'pubType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Scholarly', value: 'Scholarly'},
          {title: 'Media', value: 'Media'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'venue',
              title: 'Venue',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'label', title: 'Label', type: 'string'}),
                    defineField({name: 'href', title: 'URL', type: 'string'}),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'year'},
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'pubType'},
  },
})
