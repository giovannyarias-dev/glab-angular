export interface AppState {
  pages: PagesState;
}

export interface PagesState {
  [key: string]: Page
}

export interface Page {
  id: string;
  structure: CardStructure[];
  components: {[key: string]: DynamicComponent};
}

export interface DynamicComponent {
  component: string;
  inputs: {[key: string]: any};
  hide?: boolean;
}

export interface CardStructure {
  id: string;
  sections?: SectionStructure[];
}

export interface SectionStructure {
  id: string;
  components?: string[];
}