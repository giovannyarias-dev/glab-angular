import { createSelector } from "@ngrx/store";
import { AppState, Structure, DynamicComponent, Actions } from "@models/store";

export const selectStructure = (pageId: string) => createSelector(
  (state: AppState) => state.pages[pageId].structure,
  (structure: Structure) => structure
);

export const selectComponent = (pageId: string, componentId: string) => createSelector(
  (state: AppState) => state.pages[pageId].components[componentId],
  (dynamicComponent: DynamicComponent) => dynamicComponent
);

export const selectPageComponents = (pageId: string) => createSelector(
  (state: AppState) => state.pages[pageId].components,
  (dynamicComponents: {[key: string]: DynamicComponent}) => dynamicComponents
);

export const selectPageActions = (pageId: string) => createSelector(
  (state: AppState) => state.pages[pageId].actions,
  (actions: Actions) => actions
);