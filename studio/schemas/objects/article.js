import { baseLanguage } from '../supportedLanguages'

export default {
  type: 'object',
  name: 'articleSection',
  title: 'Article',
  fields: [
    {
      name: 'icon',
      type: 'image',
      title: 'Icone',
      options: {
        hotspot: true
      }
    },
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading'
    },
    {
      name: 'tagline',
      type: 'simplePortableText',
      title: 'Tagline'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'cta',
      title: 'Call to action',
      type: 'cta'
    }
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
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
