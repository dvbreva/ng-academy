import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

    users: User[];
    destroy$ = new Subject<boolean>();

    constructor(private authService: AuthenticationService,
        private userService: UsersService,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getUsers();
    }

    onDeleteClick(user: any): void {
        this.userService.deleteUser(user.id).subscribe(response => {
            this.getUsers();
            this.toastr.success('Successfully deleted user!');
        }, error => {
            this.toastr.error(`Some error occurred. ${error}`)
        });
    }

    onBlockClick(user: any): void {
        this.userService.blockUser(user).subscribe(response => {
            this.getUsers();
            this.toastr.success('Successfully blocked user!');
        }, error => {
            this.toastr.error(`Some error occurred. ${error}`)
        });
    }

    private getUsers(searchValue?: string): void {
        const currentLoggedUser = this.authService.getLoggedUser();

        this.userService.getUsers().pipe(
            map(response => response.filter(x => x.id != currentLoggedUser.id)), //exclude current user from table
            takeUntil(this.destroy$)
        ).subscribe(response => {
            this.users = response;
        }, error => {
            this.toastr.error(`Some error occurred. ${error}`)
        });
    }
}
