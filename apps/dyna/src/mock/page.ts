export const page = {
  id: 'home',
  structure: [
    {
      id: 'dynamicCard1',
      sections: [
        {
          id: 'section1',
          components: ['select1', 'select2']
        },
        {
          id: 'section2',
          components: ['select3', 'select4']
        }
      ]
    },
    {
      id: 'dynamicCard2',
    }
  ],
  components: {
    dynamicCard1: {
      component: 'Card'
    },
    dynamicCard2: {
      component: 'Card'
    },
    section1: {
      component: 'DynamicSection'
    },
    section2: {
      component: 'DynamicSection'
    },
    select1: {
      component: 'Select'
    },
    select2: {
      component: 'Select'
    },
    select3: {
      component: 'Select'
    },
    select4: {
      component: 'Select'
    }
  }
}

export const newStructure = [
  {
    id: 'dynamicCard1',
    childs: [
      {
        id: 'section1',
        childs: [
          {
            id: 'select1'
          }
        ]
      },
      {
        id: 'section2',
        childs: [
          {
            id: 'select3'
          },
          {
            id: 'select4'
          }
        ]
      }
    ]
  }
]

export const newComponents = {
  dynamicCard1: {
    component: 'DynamicCard'
  },
  section1: {
    component: 'DynamicSection'
  },
  section2: {
    component: 'DynamicSection'
  },
  select1: {
    component: 'Select'
  },
  select2: {
    component: 'Select'
  },
  select3: {
    component: 'Select'
  },
  select4: {
    component: 'Select',
    hide: true
  }
}