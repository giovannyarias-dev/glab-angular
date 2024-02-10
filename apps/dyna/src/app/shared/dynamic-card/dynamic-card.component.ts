import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import { AppState, CardStructure } from "@models/store";
import { Store } from "@ngrx/store";
import { DynamicSectionComponent } from "@shared/dynamic-section/dynamic-section.component";
import { selectPageComponent } from "@store/selectors/app.selectors";
import { Subscription } from "rxjs";

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
        <glab-dynamic-section [sectionsStructure]="cardStructure.sections"  />
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./dynamic-card.component.scss"]
})
export class DynamicCardComponent implements OnInit, OnDestroy {

  subscriptions$: Subscription = new Subscription();
  pageId!: string;
  cardStructure!: CardStructure;
  component: any

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.addComponentSubs();
  }

  addComponentSubs() {
    this.subscriptions$.add(
      this.store.select(selectPageComponent(this.pageId, this.cardStructure.id )).subscribe((component) => {
        this.component = component;
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}







  