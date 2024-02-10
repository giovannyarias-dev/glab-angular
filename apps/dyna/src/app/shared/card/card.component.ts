import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "glab-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      esooo
    </div>
  `,
  styleUrls: ["./card.component.scss"]
})
export class CardComponent {}