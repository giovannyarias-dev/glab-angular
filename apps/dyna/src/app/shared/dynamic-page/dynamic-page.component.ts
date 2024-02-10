import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { DYNAMIC_COMPONENTS } from "@constants/dynamic-components";
import { AppState, CardStructure } from "@models/store";
import { Store } from "@ngrx/store";

import { selectPageComponents, selectPageStructure } from "@store/selectors/app.selectors";
import { Subscription, firstValueFrom } from "rxjs";

@Component({
  selector: "glab-dynamic-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dynamic-page">
      <ng-container #adHost />
    </div>
  `,
  styleUrls: ["./dynamic-page.component.scss"]
})
export class DynamicPageComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @ViewChild('adHost', { static: true, read: ViewContainerRef }) adHost!: ViewContainerRef;
  subscriptions$: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.addStructureSubs();
  }

  addStructureSubs() {
    this.subscriptions$.add(
      this.store.select(selectPageStructure(this.pageId)).subscribe((cardStructure: CardStructure[]) => {
        if( cardStructure ) {
          this.addDynamicComponents(cardStructure);
        }
    }));
  }

  async addDynamicComponents(cardStructure: CardStructure[]) {
    const components = await firstValueFrom(this.store.select(selectPageComponents(this.pageId)));
    this.adHost.clear();
    cardStructure.forEach((component: any) => {
      const cmp = DYNAMIC_COMPONENTS[components[component.id].component];
      this.adHost.createComponent(cmp);
    });
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

}