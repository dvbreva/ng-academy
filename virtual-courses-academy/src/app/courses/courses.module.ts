import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './courses-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CourseRoutingModule,
    NgbModule
  ],
  declarations: [
    CoursesComponent,
    DashboardComponent,
    CourseCardComponent
  ]
})
export class CoursesModule { }
