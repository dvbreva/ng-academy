import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

	formGroup: FormGroup;
	user: User;
	active = 1; //tab

	destroy$ = new Subject<boolean>();

	constructor(private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthenticationService,
		private userService: UsersService,
		private toastr: ToastrService) {
	}

	ngOnInit(): void {
		const user = this.authService.getLoggedUser();

		if (user) {
			this.user = user;
		}

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
		).subscribe(() => {
			this.router.navigate(['/courses']);
			this.toastr.success('Successfully edited profile!');
		}, error => {
			this.toastr.error('Some error occurred.')
		});
	}

	private buildForm(): void {
		if (!this.user) {
			this.user = {
				name: '',
				email: ''
			};
		}

		this.formGroup = this.fb.group({
			id: [this.user.id],
			name: [this.user.name, [Validators.required, Validators.minLength(5)]],
			email: [this.user.email, [Validators.required]]
		});
	}
}
