import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { selectComponent } from "@store/selectors/app.selectors";
import { AppState, Structure, Trigger } from "@models/store";
import { DynamicComponent } from "@models/store";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { COMPONENT_INPUTS } from "@constants/dynamic-components";
import { hideComponent, showComponent } from "@store/actions/app.actions";

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

  addComponentSubs() {
    this.subscriptions$.add(
      this.store.select(selectComponent(this.pageId, this.structure.id )).subscribe((component) => {
        if(component) {
          this.component = component;
          this.addControl(this.structure.id, component);
          this.dynamicComponentService.addComponentToView(this.adHostCmp, this.structure.id, component, this.form);
        }
    }));
  }

  addControl(componentId: string, component: DynamicComponent) {
    const formControl = new FormControl(component.inputs[COMPONENT_INPUTS.VALUE], Validators.required);
    if(component.triggers) {
      this.addTriggersSubs(formControl, component.triggers);
    }
    this.form.addControl(componentId, formControl);
  }

  addTriggersSubs(formControl: FormControl, triggers: Trigger[]) {
    formControl.valueChanges.subscribe(value => {
      this.applyTriggers(value, triggers)
    });
  }

  applyTriggers(evalValue: any, triggers: Trigger[]) {
    triggers.forEach((trigger:any) => {
      if(trigger.type === 'show') {
        this.applyShowTrigger(evalValue, trigger);
      }
    })
  }

  applyShowTrigger(evalValue: any, trigger: Trigger) {
    if(evalValue === trigger.conditionValue ) {
      this.store.dispatch(showComponent({ pageId: this.pageId, componentId: trigger.target }));
    } else {
      this.store.dispatch(hideComponent({ pageId: this.pageId, componentId: trigger.target }));
    }
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}