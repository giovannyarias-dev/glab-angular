import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "glab-icon",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./icon.component.html",
  styleUrl: "./icon.component.scss"
})
export class IconComponent {
  @Input() name!: string;
  @Input() size: 'xs' | 's' | 'm' | 'l' = 'm';

  get iconRef() {
    return `assets/icons.svg#${this.name}`;
  }
}