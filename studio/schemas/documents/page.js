export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata'
    }
  ],
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      localize: true
    },
    {
      name: 'content',
      type: 'array',
      title: 'Contenu',
      of: [
        { type: 'hero' },
        { type: 'prestations' },
        { type: 'articleSection' },
        { type: 'partnerSection' },
        { type: 'openingHours' },
        { type: 'prestationArticle' }
      ]
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata'
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata'
    },
    {
      name: 'includeInSitemap',
      type: 'boolean',
      title: 'Include page in sitemap',
      description: 'For search engines. Will be added to /sitemap.xml',
      fieldset: 'metadata'
    },
    {
      name: 'disallowRobots',
      type: 'boolean',
      title: 'Disallow in robots.txt',
      description: 'Hide this route for search engines',
      fieldset: 'metadata'
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'openGraphImage'
    }
  }
}
