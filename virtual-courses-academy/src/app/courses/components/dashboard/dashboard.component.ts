import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../models/course.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CoursesService } from '../../services/course.service';
import { AuthenticationService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  courses: Course[];
  favouriteCourses: Course[];
  selectedCourse: Course;
  selectedCourseTitle: string;

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(private coursesService: CoursesService,
    private authService: AuthenticationService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getCourses();
    console.log(this.courses)
    this.formGroup = this.fb.group({
      search: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCourseSelected(id: number): void {
  /*  const userId = this.authService.getLoggedUserId();
    const user = this.authService.getUserById(userId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(x => { console.log('user', x)}); */

    const currentUser = this.authService.getLoggedUser();

    this.coursesService.addCourseToFavourites(id, currentUser).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        console.log(response)
      }, error => {
        alert(error)
      });

      /*
    this.coursesService.getCourseById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.selectedCourseTitle = res.name;
    }, err => {
      console.log(err)
    }); */
  }

  onSearch(): void {
    // get title from form
    const searchValue = this.formGroup.controls.search.value;

    this.getCourses(searchValue);
  }

  onClearSearch(): void {
    this.formGroup.get('search').setValue(null);

    this.getCourses();
  }

  onDelete(id: number): void {
    this.coursesService.deleteCourse(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getCourses();
    });
  }

  private getCourses(searchValue?: string): void {
    this.coursesService.getCourses(searchValue).pipe(
      // map(response => response.filter(x => x.rating > 7)),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.courses = response;
    }, error => {
      console.log(error);
    });
  }

}
