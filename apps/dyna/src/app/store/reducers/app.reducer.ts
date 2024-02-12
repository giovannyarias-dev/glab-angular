import { newPage } from "@mock/page";
import { createReducer, on } from "@ngrx/store";

import { addPageComponents, hideComponent, showComponent, updateTest} from "@store/actions/app.actions";

const initialState = {}

export const appReducer = createReducer(
  initialState,
  on(addPageComponents, (state, { page }) => {
    return { ...state, [page.id]: page }
  }),
  on(showComponent, (state: any, { pageId, componentId}) => {
    const inputs = {
      ...state[pageId].components[componentId].inputs,
      hide: false
    }
    return { 
      ...state, 
      [pageId]: {
        ...state[pageId], 
        components: {
          ...state[pageId].components, 
          [componentId]: {
            ...state[pageId].components[componentId],
            inputs 
          }
        }
      } 
    }
  }),
  on(hideComponent, (state: any, { pageId, componentId }) => {
    const inputs = {
      ...state[pageId].components[componentId].inputs,
      hide: true
    }
    return { 
      ...state, 
      [pageId]: {
        ...state[pageId], 
        components: {
          ...state[pageId].components, 
          [componentId]: {
            ...state[pageId].components[componentId],
            inputs 
          }
        }
      } 
    }
  }),
  on(updateTest, (state) => {
    return { ...state, ['home']: newPage }
  }),
)