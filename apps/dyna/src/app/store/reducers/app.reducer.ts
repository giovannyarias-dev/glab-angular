import { newPage } from "@mock/page";
import { createReducer, on } from "@ngrx/store";

import { addPageComponents, updateTest} from "@store/actions/app.actions";

const initialState = {}

export const appReducer = createReducer(
  initialState,
  on(addPageComponents, (state, { page }) => {
    return { ...state, [page.id]: page }
  }),
  on(updateTest, (state) => {
    return { ...state, ['home']: newPage }
  }),
)