import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'webapp',
  title: 'Web Application',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
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
    select: {title: 'title'},
  },
})
