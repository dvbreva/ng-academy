import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';
import { FormValidators } from '../../validators/form.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   form: FormGroup;
   errorMessage: string;

   destroy$ = new Subject<boolean>();

   constructor(private fb: FormBuilder,
      private router: Router,
      private authService: AuthenticationService,
      private toastr: ToastrService) {
   }

   ngOnInit(): void {
      this.buildForm();
   }

   onSubmit(): void {
      // check for password mismatch
      const formData = this.form.value;

      // getAllUsers -> check if email exists
      this.authService.getUsers().pipe(
         map((response: User[]) => response.find(user => user.email === formData.email)),
         takeUntil(this.destroy$)
      ).subscribe(userResponse => {
         if (userResponse) {
            this.errorMessage = 'Email is already in use. Try with another one.';

            return;
         }

         this.authService.register(this.form.value).pipe(
            takeUntil(this.destroy$)
         ).subscribe(response => {
            this.router.navigate(['auth/login']);
            this.toastr.success('Successfully registered!');
         }, error => {
           this.toastr.error('Some error occurred.')
         });
      });
   }

   private buildForm(): void {
      this.form = this.fb.group({
         name: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(5)]],
         rePassword: ['', [
            Validators.required,
            Validators.minLength(5),
            FormValidators.equalPasswordsValidator(this.form?.controls?.password.value)]
         ]
      });
   }
}
