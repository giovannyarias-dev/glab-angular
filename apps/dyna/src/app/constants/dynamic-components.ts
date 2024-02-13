import { InputTextMediatorComponent } from "@shared/InputText/input-text-mediator";
import { DynamicCardComponent } from "@shared/dynamic-card/dynamic-card.component";

export const DYNAMIC_COMPONENTS: {[key: string]: any} = {
  'DynamicCard': DynamicCardComponent,
  'InputText': InputTextMediatorComponent,
};

export const COMPONENT_INPUTS = {
  VALUE: 'value', 
  HIDE: 'hide',
} 

export const TRIGGERS = {
  SHOW: 'show'
}