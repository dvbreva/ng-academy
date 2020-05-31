import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthenticatedGuard } from './core/guards/non-authenticated.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [NonAuthenticatedGuard]
  },
  {
     path: 'courses',
     loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
     canLoad: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
