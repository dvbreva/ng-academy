import {AbstractControl, ValidatorFn} from '@angular/forms';

export class FormValidators {
  static equalPasswordsValidator(value: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} | null => {
      return value !== control.value ? {passwordMismatch: true} : null;
    };
  }
}
