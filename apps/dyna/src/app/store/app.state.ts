import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/store';
import { appReducer } from './reducers/app.reducer';

const reducers: ActionReducerMap<AppState> = {
  pages: appReducer
}

export { reducers }