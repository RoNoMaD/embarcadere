import { baseLanguage } from '../supportedLanguages'

export default {
  type: 'object',
  name: 'articleSection',
  title: 'Article',
  fields: [
    {
      name: 'icon',
      type: 'image',
      title: 'Icone'
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      localize: true
    },
    {
      name: 'tagline',
      type: 'simplePortableText',
      title: 'Tagline',
      localize: true
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
