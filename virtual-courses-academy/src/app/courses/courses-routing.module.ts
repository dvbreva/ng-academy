import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Route[] = [
    {
        path: '',
        component: CoursesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
