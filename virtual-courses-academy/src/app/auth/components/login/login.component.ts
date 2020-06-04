import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onSubmit(): void {
        this.errorMessage = null;

        const email = this.form.controls.email.value;
        const password = this.form.get('password').value;

        this.authService.login(email, password).pipe(
            takeUntil(this.destroy$)
        ).subscribe(response => {
            if (!response) {
                this.toastr.error('Invalid email or password.')
                return;
            }

            // store logged user
            this.authService.setLoggedUser(response);

            // redirect to main app
            this.router.navigate(['courses/dashboard']);
            this.toastr.success('Successfully logged in!');
        }, error => {
          this.toastr.error('Some error occurred.')
        });
    }

    private buildForm(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
