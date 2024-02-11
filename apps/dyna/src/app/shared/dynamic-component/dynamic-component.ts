import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { selectComponent } from "@store/selectors/app.selectors";
import { AppState, Structure } from "@models/store";
import { DynamicComponent } from "@models/store";

@Component({
  selector: "glab-dynamic-component",
  standalone: true,
  imports: [CommonModule],
  template: `<ng-container #adHostCmp />`,
  styleUrls: []
})
export class DynamicComponentComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @Input() structure!: Structure;
  @ViewChild('adHostCmp', { static: true, read: ViewContainerRef }) adHostCmp!: ViewContainerRef;

  subscriptions$: Subscription = new Subscription();
  component!: DynamicComponent;

  constructor(
    private store: Store<AppState>,
    private dynamicComponentService: DynamicComponentService
  ) {}

  ngOnInit(): void {
    this.addComponentSubs();
  }

  addComponentSubs() {
    this.subscriptions$.add(
      this.store.select(selectComponent(this.pageId, this.structure.id )).subscribe((component) => {
        if(component) {
          this.component = component;
          this.dynamicComponentService.addComponentToView(this.adHostCmp, component);
        }
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}