import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'org',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Time Period',
      type: 'string',
    }),
    defineField({
      name: 'where',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'bullets',
      title: 'Description Bullets',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
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
    select: {title: 'role', subtitle: 'org'},
  },
})
