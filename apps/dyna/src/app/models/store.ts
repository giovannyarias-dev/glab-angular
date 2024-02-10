export interface AppState {
  pages: PagesState;
}

export interface PagesState {
  [key: string]: Page
}

export interface Page {
  id: string;
  structure: CardStructure[];
  components: {[key: string]: Component};
}

export interface Component {
  component: string;
  hide?: boolean;
  inputs?: {[key: string]: any};
}

export interface CardStructure {
  id: string;
  sections?: SectionStructure[];
}

export interface SectionStructure {
  id: string;
  components?: string[];
}