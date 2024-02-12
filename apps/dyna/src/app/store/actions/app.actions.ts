import { Page } from "@models/store";
import { createAction, props } from "@ngrx/store";

export const addPageComponents = createAction('[app] addPageComponents', props<{ page: Page }>());
export const showComponent = createAction('[app] showComponent', props<{ pageId: string, componentId: string }>());
export const hideComponent = createAction('[app] hideComponent', props<{ pageId: string, componentId: string }>());




export const updateTest = createAction('[app] updateTest');

