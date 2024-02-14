import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { DynamicComponentService } from "@services/dynamic-component/dynamic-component.service";
import { selectStructure } from "@store/selectors/app.selectors";
import { AppState, Structure } from "@models/store";
import { FormGroup } from "@angular/forms";
import { updateTest } from "@store/actions/app.actions";

@Component({
  selector: "glab-dynamic-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dynamic-page">
      <ng-container #adHost />
    </div>
    <div class="actions">
      <button (click)="update()">
        Actualizar
      </button>
      <button (click)="printForm()">
        Print form
      </button>
    <div>
  `,
  styleUrls: ["./dynamic-page.component.scss"]
})
export class DynamicPageComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @ViewChild('adHost', { static: true, read: ViewContainerRef }) adHost!: ViewContainerRef;

  subscriptions$: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>,
    private dynamicComponentService: DynamicComponentService
  ) {}

  ngOnInit(): void {
    this.addStructureSubs();
  }

  addStructureSubs() {
    this.subscriptions$.add(
      this.store.select(selectStructure(this.pageId)).subscribe(async (structure: Structure) => {
        if( structure ) {
          //this.form = await this.dynamicComponentService.addAllControlsToForm(this.pageId, this.form);
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