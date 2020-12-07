export default {
  type: 'object',
  name: 'prestations',
  title: 'Prestations',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      localize: true
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
      title: 'heading',
      media: 'content[0].image'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Prestations',
        media
      }
    }
  }
}
