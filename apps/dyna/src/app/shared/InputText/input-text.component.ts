import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "glab-input-text",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./input-text.component.html",
  styleUrls: ["./input-text.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor, OnInit {

  @Input() label?: string;
  @Input() value: string | null = null;

  callbackScope = this;
  callback?: (callbackScope: this, scope: this) => void;
  
  ngOnInit(): void {
    console.log('entra Input '+this.label);
  }

  onChange(event: any) {
    this.value = event.target.value;
    this.onChangeFn(this.value);
  }

  onChangeFn = (_: string | null) => {
    console.log('onChangeFn');
    if(this.callback) {
      this.callback(this.callbackScope, this);
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
  }

  setReadOnlyState?(isReadOnly: boolean): void {
    console.log('setReadOnlyState');
  }

}







  