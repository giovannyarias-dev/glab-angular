import { Injectable, ViewContainerRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppState, DynamicComponent, Structure, Trigger } from '@models/store';
import { selectComponent, selectPageComponents } from '@store/selectors/app.selectors';
import { COMPONENT_INPUTS, DYNAMIC_COMPONENTS, REACTIVE_COMPONENTS, TRIGGERS } from '@constants/dynamic-components';
import { clearFieldError, hideComponent, setFieldError, showComponent } from '@store/actions/app.actions';
import { FormErrorHandlerService } from '@services/form-error-handler/form-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(
    private store: Store<AppState>,
    private formErrorHandlerService: FormErrorHandlerService
  ) {}

  addStructureChildsToView(adHost: ViewContainerRef, pageId: string, form: FormGroup, structure: Structure) {
    adHost.clear();
    structure.childs?.forEach(async (structureItem: Structure) => {
      const componentConfig = await firstValueFrom(this.store.select(selectComponent(pageId, structureItem.id )));
      const cmp = DYNAMIC_COMPONENTS[componentConfig.component];
      const cmpRef = adHost.createComponent(cmp);
      if(cmpRef.instance) {
        Object.assign(cmpRef.instance, { pageId, structure: structureItem, form },)
      }
    });
  }

  async addComponentToView(adHost: ViewContainerRef, componentId: string, component: DynamicComponent, form: FormGroup) {
    adHost.clear();
    const cmp = DYNAMIC_COMPONENTS[component.component];
    const cmpRef = adHost.createComponent(cmp);
    if(cmpRef.instance) {
      const instance: any = cmpRef.instance;
      Object.assign(instance, { ...component.inputs })
      instance.form = form;
      instance.formControlName = componentId;
    }
  }

  async createForm(pageId: string): Promise<FormGroup> {
    const form = new FormGroup({});
    const allComponents = await firstValueFrom(this.store.select(selectPageComponents(pageId)));
    const idReactiveComponents: string[] =  Object.keys(allComponents).filter((componentId) => REACTIVE_COMPONENTS.includes(allComponents[componentId].component));

    this.formErrorHandlerService.addHandleErrors(form);
    this.addErrorMessagesSubs(pageId);
    
    idReactiveComponents.forEach((componentId: string) => {
      const component = allComponents[componentId];
      const formControl = new FormControl(component.inputs[COMPONENT_INPUTS.VALUE]);
      
      this.addTriggersSubs(pageId, formControl, component.triggers, form);
      
      if(!component.inputs[COMPONENT_INPUTS.HIDE] && component.validators) 
        this.addValidators(formControl, component.validators);

      form.addControl(componentId, formControl);
    });

    return form;
  }

  private addTriggersSubs(pageId: string, formControl: FormControl, triggers: Trigger[] | undefined, form: FormGroup) {
    if(triggers) {
      formControl.valueChanges.subscribe(value => {
        this.applyTriggers(pageId, value, triggers, form)
      });
    }
  }

  private applyTriggers(pageId: string, evalValue: any, triggers: Trigger[], form: FormGroup) {
    triggers.forEach((trigger:any) => {
      if(trigger.type === TRIGGERS.SHOW) {
        this.applyShowTrigger(pageId, evalValue, trigger, form);
      }
    })
  }

  private applyShowTrigger(pageId: string, evalValue: any, trigger: Trigger, form: FormGroup) {
    const targets = trigger.target instanceof Array ? trigger.target : [trigger.target];
    
    if(evalValue === trigger.conditionValue ) {
      targets.forEach(async (target: string) => {
        const targetComponent = await firstValueFrom(this.store.select(selectComponent(pageId, target)));
        if(targetComponent.inputs[COMPONENT_INPUTS.HIDE]) {
          this.store.dispatch(showComponent({ pageId, componentId: target }));
        }
      });
    } else {
      targets.forEach(async (target: string) => {
        const targetComponent = await firstValueFrom(this.store.select(selectComponent(pageId, target)));
        if(!targetComponent.inputs[COMPONENT_INPUTS.HIDE]) {
          form.get(target)?.setValue('');
          this.store.dispatch(hideComponent({ pageId, componentId: target }));
        }
      });
    } 
  }

  private addValidators(formControl: FormControl, validatorsStr: string[]) {
    if(validatorsStr) {
      const validators = validatorsStr.map((validator) => {
        return Validators[validator as keyof Validators];
      });
      formControl.setValidators(validators);
    }
  }

  private addErrorMessagesSubs(pageId: string) {
    this.formErrorHandlerService.errorSubject
      .subscribe(async (error) => {
        if(error.field) {
          if(error.message) {
            this.store.dispatch(setFieldError({ pageId, componentId: error.field as string, error: error.message }));
          } else {
            const component = await firstValueFrom(this.store.select(selectComponent(pageId, error.field as string)));
            if(component.inputs[COMPONENT_INPUTS.ERROR]) {
              this.store.dispatch(clearFieldError({ pageId, componentId: error.field as string }));
            }
          }
        }
      }
    );
  }

}
