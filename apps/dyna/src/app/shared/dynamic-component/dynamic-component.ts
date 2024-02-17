import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { selectComponent } from "@store/selectors/app.selectors";
import { AppState, Structure, Trigger } from "@models/store";
import { DynamicComponent } from "@models/store";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { COMPONENT_INPUTS, TRIGGERS } from "@constants/dynamic-components";
import { hideComponent, showComponent, updateValue } from "@store/actions/app.actions";

@Component({
  selector: "glab-dynamic-component",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ng-container #adHostCmp />
    </form>
  `,
  styleUrls: []
})
export class DynamicComponentComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @Input() structure!: Structure;
  @Input() form!: FormGroup;

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

  private addComponentSubs() {
    this.subscriptions$.add(
      this.store.select(selectComponent(this.pageId, this.structure.id )).subscribe((component) => {
        if(component) {
          this.component = component;
          this.dynamicComponentService.addComponentToView(this.adHostCmp, this.structure.id, component, this.form);
        }
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}