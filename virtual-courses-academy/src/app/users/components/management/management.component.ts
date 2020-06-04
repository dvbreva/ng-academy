import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  users: User[];
  destroy$ = new Subject<boolean>();
  
  constructor(private authService: AuthenticationService,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onDeleteClick(user: any) : void {
    this.userService.deleteUser(user.id).subscribe(response => {
      alert('successfully deleted');
      this.getUsers();
    }, error => {
      console.log(error);
    });
  }

  onBlockClick(user: any) : void {
    this.userService.blockUser(user).subscribe(response => {
      alert('successfully blocked')
      this.getUsers();
    }, error => {
      console.log(error);
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
      console.log(error);
    });
  }
}