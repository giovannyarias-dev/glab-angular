import { newPage } from "@mock/page";
import { createReducer, on } from "@ngrx/store";

import { addPageComponents, clearFieldError, hideComponent, setFieldError, showComponent, updateTest, updateValue} from "@store/actions/app.actions";

const initialState = {}

export const appReducer = createReducer(
  initialState,
  on(addPageComponents, (state, { page }) => {
    return { ...state, [page.id]: page }
  }),
  on(showComponent, (state: any, { pageId, componentId}) => {
    const newInputs = {
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
            inputs: newInputs 
          }
        }
      } 
    }
  }),
  on(hideComponent, (state: any, { pageId, componentId }) => {
    const newInputs = {
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
            inputs: newInputs 
          }
        }
      } 
    }
  }),
  on(setFieldError, (state: any, { pageId, componentId, error }) => {
    const newInputs = {
      ...state[pageId].components[componentId].inputs,
      error: error
    }
    return { 
      ...state, 
      [pageId]: {
        ...state[pageId], 
        components: {
          ...state[pageId].components, 
          [componentId]: {
            ...state[pageId].components[componentId],
            inputs: newInputs 
          }
        }
      } 
    }
  }),
  on(clearFieldError, (state: any, { pageId, componentId }) => {
    const newInputs = {
      ...state[pageId].components[componentId].inputs,
      error: null
    }
    return { 
      ...state, 
      [pageId]: {
        ...state[pageId], 
        components: {
          ...state[pageId].components, 
          [componentId]: {
            ...state[pageId].components[componentId],
            inputs: newInputs 
          }
        }
      } 
    }
  }),
  on(updateValue, (state: any, { pageId, componentId, value }) => {
    const newValues = {
      ...state[pageId].values,
      [componentId]: value
    }
    return { 
      ...state, 
      [pageId]: {
        ...state[pageId], 
        values: newValues
      } 
    }
  }),
  on(updateTest, (state) => {
    return { ...state, ['home']: newPage }
  }),
)