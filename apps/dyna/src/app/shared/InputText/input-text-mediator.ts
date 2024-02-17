import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputTextComponent } from './input-text.component';

@Component({
  selector: 'glab-input-text-mediator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent],
  template: `
    <div [formGroup]="form">
      <glab-input-text 
        [formControlName]="formControlName"
        [label]="label"
        [hide]="hide"
        [error]="error"
      />
    </div>`,
  styleUrls: ['./input-text.component.scss']
})
export class InputTextMediatorComponent implements FormComponent {
  @Input() form!: FormGroup;
  @Input() formControlName!: string;

  @Input() label?: string;
  @Input() error?: string;
  @Input() hide = false;
}

export interface FormComponent {
  form: FormGroup;
  formControlName: string;
}