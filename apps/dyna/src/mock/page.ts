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
            cols: 3,
            childs: [
              {
                id: 'input1',
                cols: 1
              },
              {
                id: 'input2',
                cols: 1
              },
              {
                id: 'input3',
                cols: 1
              },
            ]
          },
          {
            id: 'section2',
            cols: 3,
            childs: [
              {
                id: 'input4',
                cols: 2
              }
            ]
          }
        ]
      },
      {
        id: 'dynamicCard2',
        childs: [
          {
            id: 'section3',
            cols: 3,
            childs: [
              {
                id: 'input4',
                cols: 2
              }
            ]
          }
        ]
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
    section3: {
      component: 'DynamicSection',
      inputs: {
        title: 'Title Section 3'
      }
    },
    input1: {
      component: 'InputText',
      validators: ['required'],
      cols: 2,
      triggers: [
        {
          type: 'show',
          conditionValue: '3',
          target: ['input2', 'input3', 'input4']
        }
      ],
      inputs: {
        label: 'Input 1',
      }
    },
    input2: {
      component: 'InputText',
      inputs: {
        label: 'Input 2',
        hide: true
      }
    },
    input3: {
      component: 'InputText',
      inputs: {
        label: 'Input 3',
        hide: true
      }
    },
    input4: {
      component: 'InputText',
      inputs: {
        label: 'Input 4',
        hide: true
      }
    },
  },
  actions: {
    left: [
      {
        label: 'Atras',
        id: 'prev',
      }
    ],
    right: [
      {
        label: 'Siguiente',
        id: 'next',
        disabled: true,
        validateForm: true
      }
    ]
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
            cols: 3,
            childs: [
              {
                id: 'input1',
                cols: 1
              },
              {
                id: 'input2',
                cols: 1
              },
              {
                id: 'input3',
                cols: 1
              },
            ]
          },
          {
            id: 'section2',
            cols: 3,
            childs: [
              {
                id: 'input4',
                cols: 2
              }
            ]
          }
        ]
      },
      {
        id: 'dynamicCard2',
        childs: [
          {
            id: 'section3',
            cols: 3,
            childs: [
              {
                id: 'input4',
                cols: 2
              }
            ]
          }
        ]
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
    section3: {
      component: 'DynamicSection',
      inputs: {
        title: 'Title Section 3'
      }
    },
    input1: {
      component: 'InputText',
      cols: 2,
      validators: ['required'],
      triggers: [
        {
          type: 'show',
          conditionValue: '3',
          target: ['input2', 'input3', 'input4']
        }
      ],
      inputs: {
        label: 'Input 1',
      }
    },
    input2: {
      component: 'InputText',
      validators: ['required'],
      inputs: {
        label: 'Input 2',
        hide: true
      }
    },
    input3: {
      component: 'InputText',
      inputs: {
        label: 'Input 3',
        hide: true
      }
    },
    input4: {
      component: 'InputText',
      inputs: {
        label: 'Input 4',
        hide: true
      }
    },
  }
}