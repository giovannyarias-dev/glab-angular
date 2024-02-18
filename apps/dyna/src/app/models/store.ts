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
  actions: Actions;
  values?: {[key: string]: any};
}

export interface DynamicComponent {
  component: string;
  inputs: {[key: string]: any};
  triggers?: Trigger[];
  validators?: string[];
  error?: string;
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

export interface Actions {
  left: Action[];
  right: Action[];
}

export interface Action {
  label: string;
  id: string;
  disabled?: boolean;
}
