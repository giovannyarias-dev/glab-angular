import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { selectComponent } from "@store/selectors/app.selectors";
import { AppState, Structure } from "@models/store";
import { DynamicComponent } from "@models/store";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DYNAMIC_COMPONENTS } from "@constants/dynamic-components";
import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";

@Component({
  selector: "glab-dynamic-component",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <ng-container #adHostCmp />
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
    this.form.addControl(componentId, new FormControl('88'));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  printForn() {
    console.log('form', this.form);
  }
}