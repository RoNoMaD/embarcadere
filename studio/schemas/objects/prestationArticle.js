export default {
  type: 'object',
  name: 'prestationArticle',
  title: 'Prestation',
  description: 'Description complète de la prestation à afficher sur une page dédiée.',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom',
      localize: true
    },
    {
      name: 'startingPrice',
      type: 'string',
      title: "Prix d'appel",
      localize: true
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      localize: true
    },
    {
      name: 'dogsAllowed',
      type: 'boolean',
      title: 'Chiens admis'
    },
    {
      name: 'extraInfo',
      type: 'simplePortableText',
      title: 'Information(s) complémentaire(s)',
      localize: true
    },
    {
      name: 'pricing',
      type: 'table',
      title: 'Tarifs'
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
  ]
}
