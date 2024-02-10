import { newComponents, newStructure } from "@mock/page";
import { PagesState } from "@models/store";
import { createReducer, on } from "@ngrx/store";
import { addPageComponents, updateComponents, updateStructure } from "@store/actions/app.actions";

const initialState = {}

export const appReducer = createReducer(
  initialState,
  on(addPageComponents, (state, { page }) => {
    return { ...state, [page.id]: page }
  }),




  // Borrar
  on(updateStructure, (state: PagesState) => {
    return { ...state, home: {...state["home"], structure: newStructure } }
  }),
  on(updateComponents, (state: PagesState) => {
    return { ...state, home: {...state["home"], components: newComponents } }
  })
)