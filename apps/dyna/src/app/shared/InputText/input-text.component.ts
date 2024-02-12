import { CommonModule } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
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
export class InputTextComponent implements ControlValueAccessor {

  @Input() label?: string;
  @Input() hide = false;
  
  value?: string;
  isDisabled?: boolean;

  onChange = (fn: any) => {
    return undefined;
  };

  onTouch = () => {
    return undefined;
  };

  onInput(event: any) {
    this.value = event.target.value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value ?? '' 
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}







  