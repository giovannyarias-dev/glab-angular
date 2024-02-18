import { newPage } from "@mock/page";
import { PagesState } from "@models/store";
import { createReducer, on } from "@ngrx/store";

import { addPageComponents, clearFieldError, hideComponent, setFieldError, showComponent, updateTest, updateValue} from "@store/actions/app.actions";

const initialState = {}

export const appReducer = createReducer(
  initialState,
  on(addPageComponents, (state, { page }) => {
    return { ...state, [page.id]: page }
  }),
  on(showComponent, (state: PagesState, { pageId, componentId}) => {
    const newInputs = {
      ...state[pageId].components[componentId].inputs,
      hide: false
    }
    return updateInputs(state, pageId, componentId, newInputs);
  }),
  on(hideComponent, (state: PagesState, { pageId, componentId }) => {
    const newInputs = {
      ...state[pageId].components[componentId].inputs,
      hide: true
    }
    return updateInputs(state, pageId, componentId, newInputs);
  }),
  on(setFieldError, (state: PagesState, { pageId, componentId, error }) => {
    const newInputs = {
      ...state[pageId].components[componentId].inputs,
      error: error
    }
    return updateInputs(state, pageId, componentId, newInputs);
  }),
  on(clearFieldError, (state: PagesState, { pageId, componentId }) => {
    const newInputs = {
      ...state[pageId].components[componentId].inputs,
      error: null
    }
    return updateInputs(state, pageId, componentId, newInputs);
  }),
  on(updateValue, (state: PagesState, { pageId, componentId, value }) => {
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

const updateInputs = (state: PagesState, pageId: string, componentId: string, newInputs: {[key: string]: any}) => {
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
}