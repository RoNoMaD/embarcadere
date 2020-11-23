export default {
  type: 'object',
  name: 'prestations',
  title: 'Prestations section',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Prestations',
      of: [{ type: 'prestation' }]
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Prestations section'
      }
    }
  }
}
