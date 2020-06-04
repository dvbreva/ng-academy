import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { AuthenticationService } from '../../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanLoad {

    constructor(private authService: AuthenticationService,
        private router: Router) {
    }

    canLoad(): boolean {
        const user = this.authService.getLoggedUser();
        if (user) {
            this.router.navigate(['courses/dashboard']);
            return false;
        }

        return true;
    }
}
