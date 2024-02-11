import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { selectComponent } from "@store/selectors/app.selectors";
import { AppState, Structure } from "@models/store";
import { DynamicComponent } from "@models/store";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DYNAMIC_COMPONENTS } from "@constants/dynamic-components";

@Component({
  selector: "glab-dynamic-component",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ng-container #adHostCmp />
      <!-- <input id="first-name" type="text" formControlName="firstName" /> -->
      <button (click)="printForn()">
        Print Form
      </button>
    </form>
  `,
  styleUrls: []
})
export class DynamicComponentComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @Input() structure!: Structure;
  @ViewChild('adHostCmp', { static: true, read: ViewContainerRef }) adHostCmp!: ViewContainerRef;

  subscriptions$: Subscription = new Subscription();
  component!: DynamicComponent;

  form: FormGroup = new FormGroup({ firstName: new FormControl('')} );

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.addComponentSubs();



  }

  addComponentSubs() {
    this.subscriptions$.add(
      this.store.select(selectComponent(this.pageId, this.structure.id )).subscribe((component) => {
        if(component) {
          this.component = component;
          this.addComponentToView(this.adHostCmp, component);
        }
    }));
  }

  async addComponentToView(adHost: ViewContainerRef, component: DynamicComponent) {
    adHost.clear();
    const cmp = DYNAMIC_COMPONENTS[component.component];
    const cmpRef = adHost.createComponent(cmp);
    if(cmpRef.instance) {
      const instance: any = cmpRef.instance;
      Object.assign(instance, { ...component.inputs })
      instance.callbackScope = this;
      instance.callback = this.setCmpFormValues;
    }
  }

  setCmpFormValues(scope: any, libScope: any) {
    console.log('entra setCmpFormValues');
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }


  printForn() {
    console.log('form', this.form);
  }
}