import { Page } from "@models/store";
import { createAction, props } from "@ngrx/store";

export const addPageComponents = createAction('[app] addPageComponents', props<{ page: Page }>());
export const showComponent = createAction('[app] showComponent', props<{ pageId: string, componentId: string }>());
export const hideComponent = createAction('[app] hideComponent', props<{ pageId: string, componentId: string }>());
export const updateValue = createAction('[app] updateValue', props<{ pageId: string, componentId: string, value: any }>());
export const setFieldError = createAction('[app] setFieldError', props<{ pageId: string, componentId: string, error: string }>());
export const clearFieldError = createAction('[app] clearFieldError', props<{ pageId: string, componentId: string }>());
