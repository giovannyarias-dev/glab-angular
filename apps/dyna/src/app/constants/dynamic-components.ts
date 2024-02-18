import { InputTextMediatorComponent } from "@bits/input-text-mediator";
import { DynamicCardComponent } from "@shared/dynamic-card/dynamic-card.component";

export const COMPONENTS = {
  DYNAMIC_CARD: 'DynamicCard',
  INPUT_TEXT: 'InputText',
  DYNAMIC_SECTION: 'DynamicSection',
  DYNAMIC_PAGE: 'DynamicPage',
}

export const DYNAMIC_COMPONENTS: {[key: string]: any} = {
  [COMPONENTS.DYNAMIC_CARD]: DynamicCardComponent,
  [COMPONENTS.INPUT_TEXT]: InputTextMediatorComponent,
};

export const REACTIVE_COMPONENTS = [
  COMPONENTS.INPUT_TEXT
]

export const COMPONENT_INPUTS = {
  VALUE: 'value', 
  HIDE: 'hide',
  ERROR: 'error'
} 

export const TRIGGERS = {
  SHOW: 'show'
}