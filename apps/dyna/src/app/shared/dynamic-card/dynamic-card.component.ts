import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: "glab-dynamic-card",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        Simple card
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./dynamic-card.component.scss"]
})
export class DynamicCardComponent {}