import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import { AppState, Structure } from "@models/store";
import { Store } from "@ngrx/store";
import { DynamicSectionComponent } from "@shared/dynamic-section/dynamic-section.component";
import { Subscription } from "rxjs";
import { DynamicComponent } from "@models/store";
import { selectComponent } from "@store/selectors/app.selectors";

@Component({
  selector: "glab-dynamic-card",
  standalone: true,
  imports: [CommonModule, MatCardModule, DynamicSectionComponent],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          {{ component.inputs['title'] }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngFor="let itemStructure of structure.childs">
          <glab-dynamic-section [pageId]="pageId" [structure]="itemStructure"/>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: []
})
export class DynamicCardComponent implements OnInit, OnDestroy {
  
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







  