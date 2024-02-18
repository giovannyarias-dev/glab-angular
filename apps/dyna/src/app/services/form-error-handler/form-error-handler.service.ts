import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ValidationErrorService } from '@services/validation-error/validation-error.service';

@Injectable({
  providedIn: 'root'
})
export class FormErrorHandlerService {

  errorSubject: BehaviorSubject<{ field: string | null; message: string | null }> = new BehaviorSubject<{ field: string | null; message: string | null }>({ field: null, message: null });

  private message!: string;

  constructor(private validationErrorService: ValidationErrorService) { }

  addHandleErrors(form: FormGroup): Subscription {
    return form.valueChanges.pipe(debounceTime(100), distinctUntilChanged())
    .subscribe(() => {
      this.findErrors(form.controls);
    })
  }

  private findErrors(controls: {[key: string]: AbstractControl}) {
    Object.keys(controls).forEach((idControl: string) => {
      this.findErrorsOnFormControl(idControl, controls[idControl]);
    })
  }

  private findErrorsOnFormControl(idControl: string, control: AbstractControl) {
    if(this.hasError(control)) {
      this.setErrorMessage(control.errors);
      this.setErrorToErrorObject(idControl, this.message);
    } else {
      this.setErrorToErrorObject(idControl, null);
    }
  }

  private hasError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  private setErrorMessage(errors: ValidationErrors | null) {
    if(errors && Object.keys(errors).length > 0) {
      this.message = this.validationErrorService.getMessage(errors);
    }
  }

  private setErrorToErrorObject(
    field: string,
    message: string | null,
  ) {
    console.log(field+' - '+message+' - ');


    this.errorSubject.next({ field, message });
    // Object.defineProperty(errorObject, field, {
    //   value: message,
    //   writable: true
    // });
  }
}