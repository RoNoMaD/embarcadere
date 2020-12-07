export default {
  type: 'object',
  name: 'openingHours',
  title: "Horaires d'ouverture",
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Titre',
      localize: true
    },
    {
      name: 'ranges',
      type: 'array',
      title: 'Intervalles',
      of: [
        {
          type: 'object',
          name: 'range',
          title: 'Intervalle',
          fields: [
            {
              type: 'array',
              name: 'monthsRanges',
              title: 'Intervalles de mois',
              of: [
                {
                  type: 'string',
                  name: 'monthsRange',
                  title: 'Intervalle de mois'
                }
              ]
            },
            {
              type: 'array',
              name: 'hoursRanges',
              title: "Intervalles d'heures",
              of: [
                {
                  type: 'string',
                  name: 'hoursRange',
                  title: "Intervalle d'heures"
                }
              ]
            }
          ],
          preview: {
            select: {
              monthsRanges: 'monthsRanges'
            },
            prepare({ monthsRanges }) {
              return {
                title: monthsRanges.join(', ')
              }
            }
          }
        }
      ]
    },

    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Image de fond'
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Horaires d'ouverture"
      }
    }
  }
}
