import { Page } from "@models/store";
import { createAction, props } from "@ngrx/store";

export const addPageComponents = createAction('[app] addPageComponents', props<{ page: Page }>());





export const updateTest = createAction('[app] updateTest');

