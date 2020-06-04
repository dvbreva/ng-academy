import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { ManagementComponent } from './components/management/management.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent
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
