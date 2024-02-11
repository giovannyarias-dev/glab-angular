import { Injectable, ViewContainerRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AppState, DynamicComponent, Structure } from '@models/store';
import { Store } from '@ngrx/store';
import { selectComponent } from '@store/selectors/app.selectors';
import { DYNAMIC_COMPONENTS } from '@constants/dynamic-components';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(private store: Store<AppState>) {}

  addStructureChildsToView(adHost: ViewContainerRef, pageId: string, structure: Structure) {
    adHost.clear();
    structure.childs?.forEach(async (structureItem: Structure) => {
      const componentConfig = await firstValueFrom(this.store.select(selectComponent(pageId, structureItem.id )));
      const cmp = DYNAMIC_COMPONENTS[componentConfig.component];
      const cmpRef = adHost.createComponent(cmp);
      if(cmpRef.instance) {
        Object.assign(cmpRef.instance, { pageId: pageId, structure: structureItem },)
      }
    });
  }

  async addComponentToView(adHost: ViewContainerRef, component: DynamicComponent) {
    adHost.clear();
    const cmp = DYNAMIC_COMPONENTS[component.component];
    const cmpRef = adHost.createComponent(cmp);
    if(cmpRef.instance) {
      Object.assign(cmpRef.instance, { ...component.inputs },)
    }
  }
}
