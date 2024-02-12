import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState, DynamicComponent, Structure } from "@models/store";
import { selectComponent } from "@store/selectors/app.selectors";
import { DynamicComponentComponent } from "@shared/dynamic-component/dynamic-component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "glab-dynamic-section",
  standalone: true,
  imports: [CommonModule, DynamicComponentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dynamic-section">
      <div class="header">
        {{ component.inputs['title'] }}
      </div>
      <div class="content" [style.grid-template-columns]="gridTemplateColumns">
        <div *ngFor="let itemStructure of structure.childs" [style.grid-column]="gridColumn(itemStructure.cols)">
          <glab-dynamic-component [pageId]="pageId" [structure]="itemStructure" [form]="form"/>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./dynamic-section.component.scss"]
})
export class DynamicSectionComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @Input() structure!: Structure;
  @Input() form!: FormGroup;

  subscriptions$: Subscription = new Subscription();
  component!: DynamicComponent;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.addComponentSubs();
  }

  addComponentSubs() {
    this.subscriptions$.add(
      this.store.select(selectComponent(this.pageId, this.structure.id )).subscribe((component) => {
        this.component = component;
    }));
  }

  get gridTemplateColumns() {
    return `repeat(${this.structure.cols ?? 4}, 1fr)`;
  }

  gridColumn(cols: number | undefined) {
    return `span ${cols ?? 1}`;
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}