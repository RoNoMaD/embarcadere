export default {
  type: 'object',
  name: 'partnerSection',
  title: 'Partenaire',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Titre',
      localize: true
    },
    {
      name: 'text',
      type: 'simplePortableText',
      title: 'Texte',
      localize: true
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Article section',
        media
      }
    }
  }
}
