export default {
  type: 'object',
  name: 'prestation',
  title: 'Prestation',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Nom',
      localize: true
    },
    {
      name: 'price',
      type: 'string',
      title: 'Prix',
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
  ]
}
