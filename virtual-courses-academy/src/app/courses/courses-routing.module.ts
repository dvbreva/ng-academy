import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

const routes: Route[] = [
    {
        path: '',
        component: CoursesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'add',
                component: AddCourseComponent
            },
            {
                path: 'edit/:id',
                component: EditCourseComponent
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
