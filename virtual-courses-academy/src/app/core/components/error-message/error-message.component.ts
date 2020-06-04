import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {

  @Input() control: AbstractControl;

  get errorMessage(): string {
    if (!this.control || !this.control.errors) {
      return;
    }

    for (const propName in this.control.errors) {
      if (this.control.touched && this.control.errors.hasOwnProperty(propName)) {
        const errors = this.control.errors;

        if (errors.required) {
          return 'This field is required. Please add a value.';
        }

        if (errors.minlength) {
          return `
            This field includes ${errors.minlength.actualLength} characters.
            This field should contain at least ${errors.minlength.requiredLength} characters.
          `;
        }

        if (errors.passwordMismatch) {
          return 'Passwords are different';
        }
      }
    }
  }
}
