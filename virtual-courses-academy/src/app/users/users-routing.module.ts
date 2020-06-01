import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ManagementComponent } from './management/management.component';

const routes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: 'management',
                component: ManagementComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
