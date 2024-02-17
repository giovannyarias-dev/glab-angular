import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import {MatButtonModule} from '@angular/material/button';
import { FormGroup } from "@angular/forms";
import { updateTest } from "@store/actions/app.actions";

import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { selectStructure } from "@store/selectors/app.selectors";
import { AppState, Structure } from "@models/store";

@Component({
  selector: "glab-dynamic-page",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="dynamic-page">
      <ng-container #adHost />
    </div>
    <div class="actions">
      <button mat-flat-button (click)="update()" [disabled]="!form.valid">
        Actualizar
      </button>
      <button mat-flat-button color="primary" (click)="printForm()">
        Print form
      </button>
    <div>
  `,
  styleUrls: ["./dynamic-page.component.scss"]
})
export class DynamicPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() pageId!: string;
  @ViewChild('adHost', { static: true, read: ViewContainerRef }) adHost!: ViewContainerRef;

  subscriptions$: Subscription = new Subscription();
  form = new FormGroup({});

  constructor(
    private store: Store<AppState>,
    private dynamicComponentService: DynamicComponentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addStructureSubs();
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