import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "glab-input-text",
  standalone: true,
  imports: [CommonModule],
  template: `
    {{ label }}
  `,
  styleUrls: []
})
export class InputTextComponent implements OnInit {

  @Input() label?: string;
  
  ngOnInit(): void {
    console.log('entra Input '+this.label);
  }
}







  