import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import {MatButtonModule} from '@angular/material/button';
import { FormGroup } from "@angular/forms";
import { updateTest } from "@store/actions/app.actions";

import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { selectPageActions, selectStructure } from "@store/selectors/app.selectors";
import { Actions, AppState, Structure } from "@models/store";
import { ExpansionCardComponent, IconComponent, PageActionsComponent } from "@bits/";

@Component({
  selector: "glab-dynamic-page",
  standalone: true,
  imports: [CommonModule, MatButtonModule, ExpansionCardComponent, IconComponent, PageActionsComponent],
  template: `
    <div class="dynamic-page">
      <ng-container #adHost />
    </div>
    <glab-page-actions 
      *ngIf="actions" 
      [actions]="actions" 
      [isFormValid]="form.valid"
    />
  `,
  styleUrls: ["./dynamic-page.component.scss"]
})
export class DynamicPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() pageId!: string;
  @ViewChild('adHost', { static: true, read: ViewContainerRef }) adHost!: ViewContainerRef;

  subscriptions$: Subscription = new Subscription();
  form = new FormGroup({});
  actions?: Actions;

  constructor(
    private store: Store<AppState>,
    private dynamicComponentService: DynamicComponentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addStructureSubs();
    this.addActionsSubs();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  private addStructureSubs() {
    this.subscriptions$.add(
      this.store.select(selectStructure(this.pageId)).subscribe(async (structure: Structure) => {
        if( structure ) {
          this.form = await this.dynamicComponentService.createForm(this.pageId);
          this.dynamicComponentService.addStructureChildsToView(this.adHost, this.pageId, this.form, structure);
        }
    }));
  }

  private addActionsSubs() {
    this.subscriptions$.add(
      this.store.select(selectPageActions(this.pageId)).subscribe(async (actions: Actions) => {
        this.actions = actions;
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  update() {
    this.store.dispatch(updateTest());
  }

  printForm() {
    console.log(this.form);
  }
}