import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorService {

  private genericError = 'Campo invalido';
  private messages = {
    required: 'Campo obligatorio'
  }

  getMessage(error: ValidationErrors): string {
    const key = error ? Object.keys(error)[0] : '';
    const requiredValue = key? this.getRequiredValue(error) : '';

    let message;
    if(key) {
      message = requiredValue
        ? this.replace(this.messages[key as keyof object], requiredValue)
        : this.messages[key as keyof object];
    }
    
    return !message? this.genericError: message
  }

  private getRequiredValue(error: ValidationErrors) {
    let length;

    if(error['min']) {
      length = error['min'].min;
    } else if (error['max']) {
      length = error['max'].max;
    } else if (error['minLength']) {
      length = error['minLength'].requiredLength;
    } else if (error['maxLength']) {  
      length = error['maxLength'].requiredLength;
    }

    return length
  }

  private replace(message: string, param: string | number): string {
    return message.replace('{{ value }}', param.toString())
  }

}