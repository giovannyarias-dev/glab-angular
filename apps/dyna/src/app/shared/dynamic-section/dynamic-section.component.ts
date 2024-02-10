import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { SectionStructure } from "@models/store";

@Component({
  selector: "glab-dynamic-section",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div>
      Section
    </div>
  `,
  styleUrls: ["./dynamic-section.component.scss"]
})
export class DynamicSectionComponent implements OnInit {

  @Input() sectionStructure?: SectionStructure;

  ngOnInit(): void {
    console.log('sectionsStructure', this.sectionStructure);
  }
}