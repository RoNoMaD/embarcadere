import bcp47 from 'bcp47'

export default {
  name: 'site-config',
  type: 'document',
  title: 'Site configuration',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  __experimental_actions: [/* create, delete, */ 'update', 'publish'],
  fieldsets: [{ name: 'footer', title: 'Pied de page' }],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre du site',
      localize: true
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url'
    },
    {
      title: "Page d'accueil",
      name: 'frontpage',
      type: 'reference',
      description: 'Choose page to be the frontpage',
      to: { type: 'page' }
    },
    {
      title: 'Language du site',
      description: 'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
      name: 'lang',
      type: 'string',
      validation: Rule =>
        Rule.custom(lang => (bcp47.parse(lang) ? true : 'Please use a valid bcp47 code'))
    },
    {
      title: 'Logo',
      description: 'Best choice is to use an SVG where the color are set with currentColor',
      name: 'logo',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true
          }
        }
      ]
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      description: 'Select pages for the top menu',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items')
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }]
        }
      ]
    },
    {
      title: "Nom de l'entreprise",
      name: 'companyName',
      type: 'string',
      fieldset: 'footer',
      localize: true
    },
    {
      title: 'Copyright',
      name: 'copyright',
      type: 'string',
      fieldset: 'footer'
    },
    {
      title: 'Contact',
      name: 'footerContact',
      type: 'object',
      fieldset: 'footer',
      fields: [
        {
          title: 'Titre',
          name: 'title',
          type: 'string',
          localize: true
        },
        {
          title: 'Téléphone',
          name: 'phone',
          type: 'string'
        },
        {
          title: 'Email',
          name: 'email',
          type: 'string'
        }
      ]
    },
    {
      title: 'Adresse',
      name: 'footerAddress',
      type: 'object',
      fieldset: 'footer',
      fields: [
        {
          title: 'Titre',
          name: 'title',
          type: 'string',
          localize: true
        },
        {
          title: 'Adresse',
          name: 'address',
          type: 'simplePortableText',
          localize: true
        }
      ]
    },
    {
      title: 'Médias sociaux',
      name: 'footerSocialMedias',
      type: 'object',
      fieldset: 'footer',
      fields: [
        {
          title: 'Titre',
          name: 'title',
          type: 'string',
          localize: true
        },
        {
          title: 'Liens',
          name: 'socialMedias',
          type: 'array',
          of: [
            {
              title: 'Média social',
              name: 'socialMedia',
              type: 'object',
              fields: [
                {
                  title: 'Nom',
                  name: 'name',
                  type: 'string'
                },
                {
                  title: 'Lien',
                  name: 'link',
                  type: 'url',
                  validation: Rule =>
                    Rule.uri({
                      scheme: ['https', 'http', 'mailto', 'tel']
                    })
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
