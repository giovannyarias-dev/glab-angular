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
  values?: {[key: string]: any};
}

export interface DynamicComponent {
  component: string;
  triggers?: Trigger[];
  inputs: {[key: string]: any};
}

export interface Trigger {
  type: string;
  target: string | string[];
  conditionValue: string;
}

export interface Structure {
  id: string;
  childs?: Structure[];
  cols?: number;
}
