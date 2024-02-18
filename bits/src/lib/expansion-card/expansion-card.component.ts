import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'glab-expansion-card',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './expansion-card.component.html',
  styleUrl: './expansion-card.component.css',
})
export class ExpansionCardComponent {
  @Input() title!: string;
  @Input() expanded = true;
}
