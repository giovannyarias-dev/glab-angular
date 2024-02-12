import { Injectable, ViewContainerRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

import { AppState, DynamicComponent, Structure } from '@models/store';
import { selectComponent } from '@store/selectors/app.selectors';
import { DYNAMIC_COMPONENTS } from '@constants/dynamic-components';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(private store: Store<AppState>) {}

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
}
