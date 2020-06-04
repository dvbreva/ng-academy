import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './courses-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CourseRoutingModule,
    NgbModule,
    CoreModule
  ],
  declarations: [
    CoursesComponent,
    DashboardComponent,
    CourseCardComponent,
    AddCourseComponent,
    EditCourseComponent
  ]
})
export class CoursesModule { }
