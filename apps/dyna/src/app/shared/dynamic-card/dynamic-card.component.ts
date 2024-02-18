import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import { AppState, Structure } from "@models/store";
import { Store } from "@ngrx/store";
import { DynamicSectionComponent } from "@shared/dynamic-section/dynamic-section.component";
import { Subscription } from "rxjs";
import { DynamicComponent } from "@models/store";
import { selectComponent } from "@store/selectors/app.selectors";
import { FormGroup } from "@angular/forms";
import { ExpansionCardComponent } from "@bits/expansion-card";

@Component({
  selector: "glab-dynamic-card",
  standalone: true,
  imports: [CommonModule, MatCardModule, DynamicSectionComponent, ExpansionCardComponent],
  template: `
    <glab-expansion-card [title]="component.inputs['title']" *ngIf="!component.inputs['hide']">
      <ng-container content>
        <div *ngFor="let itemStructure of structure.childs">
          <glab-dynamic-section [pageId]="pageId" [structure]="itemStructure" [form]="form"/>
        </div>
      </ng-container>
    </glab-expansion-card>
  `,
  styleUrls: []
})
export class DynamicCardComponent implements OnInit, OnDestroy {
  
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

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}







  