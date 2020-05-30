import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/auth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

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
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    alert('hi bitch')
    this.errorMessage = null;

    const email = this.form.controls.email.value;
    const password = this.form.get('password').value;

    this.authService.login(email, password).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      if (!response) {
        this.errorMessage = 'Invalid email or password.';

        return;
      }

      // store logged user
      this.authService.setLoggedUser(response);

      // redirect to main app
      //this.router.navigate(['movies/movies-card-list']);
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
