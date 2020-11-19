export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5fb684663821c634521ade5c',
                  title: 'Sanity Studio',
                  name: 'embarcadere-studio',
                  apiId: '9eca1e91-2626-420a-8654-e5ab6da10710'
                },
                {
                  buildHookId: '5fb6846636d0ab0f819fd615',
                  title: 'Landing pages Website',
                  name: 'embarcadere',
                  apiId: 'd4ae4aa5-364b-47bc-9848-9f9f4ec08950'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/RoNoMaD/embarcadere',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://embarcadere.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
