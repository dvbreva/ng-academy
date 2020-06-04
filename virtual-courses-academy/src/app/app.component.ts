import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from './auth/services/auth.service';
import { Role } from './utils/enums/role.enum';

import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
   title = 'virtual-courses';
   hasLoggedUser: boolean;
   isAdmin: boolean;

   destroy$ = new Subject<boolean>();

   constructor(private authService: AuthenticationService,
      private router: Router,
      private toastr: ToastrService) {
   }

   ngOnInit(): void {
      this.authService.getHasLoggedIn().pipe(
         takeUntil(this.destroy$)
      ).subscribe(response => this.hasLoggedUser = response);
      this.isAdmin = this.checkAdminRole();
   }

   ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
   }

   onLogout(): void {
      this.authService.logout();
      this.router.navigate(['auth/login']);
      this.toastr.success('Successfully logged out!');
      this.authService.getHasLoggedIn().pipe(
         takeUntil(this.destroy$)
      ).subscribe(response => this.hasLoggedUser = response);
   }

   private checkAdminRole = (): boolean => {
      const user = this.authService.getLoggedUser();
      if (user && user.roleId == Role.Admin) {
         return true;
      }
      return false;
   }
}
