export default {
  type: 'object',
  name: 'hero',
  title: 'Bannière',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Titre',
      localize: true
    },
    {
      name: 'tagline',
      type: 'simplePortableText',
      title: 'Tagline',
      localize: true
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Bannière',
        media
      }
    }
  }
}
