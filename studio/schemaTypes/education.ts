import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'school',
      title: 'School',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Time Period',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Details',
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
    select: {title: 'degree', subtitle: 'school'},
  },
})
