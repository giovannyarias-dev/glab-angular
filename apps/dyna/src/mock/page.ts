export const page = {
  id: 'home',
  structure: {
    id: 'homeList',
    childs: [
      {
        id: 'dynamicCard1',
        childs: [
          {
            id: 'section1',
            
          },
          {
            id: 'section2',
            
          }
        ]
      },
      {
        id: 'dynamicCard2',
      }
    ]
  },
  components: {
    dynamicCard1: {
      component: 'DynamicCard',
      inputs: {
        title: 'Title Card 1'
      }
    },
    dynamicCard2: {
      component: 'DynamicCard',
      inputs: {
        title: 'Title Card 2'
      }
    },
    section1: {
      component: 'DynamicSection',
      inputs: {}
    },
    section2: {
      component: 'DynamicSection',
      inputs: {}
    },
    select1: {
      component: 'Select',
      inputs: {}
    },
    select2: {
      component: 'Select',
      inputs: {}
    },
    select3: {
      component: 'Select',
      inputs: {}
    },
    select4: {
      component: 'Select',
      inputs: {}
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