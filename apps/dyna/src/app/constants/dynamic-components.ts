import { InputTextMediatorComponent } from "@shared/InputText/input-text-mediator";
import { InputTextComponent } from "@shared/InputText/input-text.component";
import { DynamicCardComponent } from "@shared/dynamic-card/dynamic-card.component";

export const DYNAMIC_COMPONENTS: {[key: string]: any} = {
  'DynamicCard': DynamicCardComponent,
  'InputText': InputTextMediatorComponent,
};

export const COMPONENT_INPUTS = {
  VALUE: 'value' 
} 