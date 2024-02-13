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
          this.addControl(this.pageId, this.structure.id, component, this.form);
          this.dynamicComponentService.addComponentToView(this.adHostCmp, this.structure.id, component, this.form);
        }
    }));
  }

  private addControl(pageId: string, componentId: string, component: DynamicComponent, form: FormGroup) {
    const formControl = new FormControl(component.inputs[COMPONENT_INPUTS.VALUE], Validators.required);
    this.addTriggersSubs(pageId, formControl, component.triggers, form);
    this.addUpdateStateSubs(pageId, formControl, componentId);
    this.form.addControl(componentId, formControl);
  }

  private addTriggersSubs(pageId: string, formControl: FormControl, triggers: Trigger[] | undefined, form: FormGroup) {
    if(triggers) {
      formControl.valueChanges.subscribe(value => {
        this.applyTriggers(pageId, value, triggers, form)
      });
    }
  }

  private addUpdateStateSubs(pageId: string, formControl: FormControl, componentId: string) {
    formControl.valueChanges.subscribe(value => {
      this.store.dispatch(updateValue({ componentId, value, pageId }));
    });
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
      targets.forEach((target: string) => {
        this.store.dispatch(showComponent({ pageId, componentId: target }));
      });
    } else {
      targets.forEach((target: string) => {
        // form.get(target)?.setValue('');
        this.store.dispatch(hideComponent({ pageId, componentId: target }));
      });
    } 
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}