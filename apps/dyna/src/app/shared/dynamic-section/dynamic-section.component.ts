import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState, DynamicComponent, Structure } from "@models/store";
import { selectComponent } from "@store/selectors/app.selectors";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: "glab-dynamic-section",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="dynamic-section">
      <div class="header">
        {{ component.inputs['title'] }}
      </div>
      <div class="content">
      </div>
    </div>
  `,
  styleUrls: ["./dynamic-section.component.scss"]
})
export class DynamicSectionComponent implements OnInit, OnDestroy {

  @Input() pageId!: string;
  @Input() structure!: Structure;

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

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}