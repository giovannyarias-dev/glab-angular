export const page = {
  id: 'home',
  structure: {
    id: 'cards',
    childs: [
      {
        id: 'dynamicCard1',
        childs: [
          {
            id: 'section1',
            childs: [
              {
                id: 'input1',
                cols: 2
              },
              {
                id: 'input2',
                cols: 2
              }
            ]
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
      inputs: {
        title: 'Title Section 1'
      }
    },
    section2: {
      component: 'DynamicSection',
      inputs: {
        title: 'Title Section 2'
      }
    },
    input1: {
      component: 'InputText',
      cols: 2,
      triggers: [
        {
          type: 'show',
          conditionValue: '3',
          target: 'input2'
        }
      ],
      inputs: {
        label: 'Input 1',
        value: 'Prueba'
      }
    },
    input2: {
      component: 'InputText',
      inputs: {
        label: 'Input 2',
        hide: true
      }
    },
  }
}


export const newPage = {
  id: 'home',
  structure: {
    id: 'cards',
    childs: [
      {
        id: 'dynamicCard1',
        childs: [
          {
            id: 'section1',
            childs: [
              {
                id: 'input1'
              },
              {
                id: 'input2'
              }
            ]
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
      cols: 4,
      inputs: {
        title: 'New Title Section 1'
      }
    },
    section2: {
      component: 'DynamicSection',
      inputs: {
        title: 'Title Section 2'
      }
    },
    input1: {
      component: 'InputText',
      inputs: {
        label: 'Input 1',
        value: 'Cesar'
      }
    },
    input2: {
      component: 'InputText',
      inputs: {
        label: 'Input 3',
        value: 'Giovanny'
      }
    },
  }
}