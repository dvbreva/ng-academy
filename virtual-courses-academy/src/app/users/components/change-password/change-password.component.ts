import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/user.service';
import { User } from 'src/app/auth/models/user.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  user: User;
  formGroup: FormGroup;
  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UsersService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const formData = this.formGroup.value;

    this.userService.updateBasicInfo(this.user, formData).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.router.navigate(['/courses']);
      alert("successfully edited your password")
    }, error => {
      alert(error)
    });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}

