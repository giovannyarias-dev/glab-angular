import { createSelector } from "@ngrx/store";
import { AppState } from "@models/store";

export const selectPageStructure = (pageId: string) => createSelector(
  (state: AppState) => state.pages[pageId].structure,
  (state: any) => state
);

export const selectPageComponents = (pageId: string) => createSelector(
  (state: AppState) => state.pages[pageId].components,
  (state: any) => state
);