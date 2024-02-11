export interface AppState {
  pages: PagesState;
}

export interface PagesState {
  [key: string]: Page
}

export interface Page {
  id: string;
  structure: Structure;
  components: {[key: string]: DynamicComponent};
}

export interface DynamicComponent {
  component: string;
  inputs: {[key: string]: any};
}

export interface Structure {
  id: string;
  childs?: Structure[];
  cols?: number;
}
