import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/course.service';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { Role } from 'src/app/utils/enums/role.enum';

import { ToastrService } from 'ngx-toastr';

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
  isAdmin: boolean;

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(private coursesService: CoursesService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCourses();

    this.formGroup = this.fb.group({
      search: ['']
    });

    this.isAdmin = this.checkAdminRole();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCourseSelected(id: number): void {
    const currentUser = this.authService.getLoggedUser();

    this.coursesService.addCourseToFavourites(id, currentUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.toastr.success('Success!', 'Successfully added course to favourites!');
    }, error => {
      this.toastr.error(`Some error occurred. ${error}`)
    });
  }

  onSearch(): void {
    // get title from form
    const searchValue = this.formGroup.controls.search.value;
    this.getCourses(searchValue);
  }

  onDelete(id: number): void {
    this.coursesService.deleteCourse(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getCourses();
      this.toastr.success('Successfully deleted course!');
    }, error => {
      this.toastr.error('Error..', 'Some error occurred.')
    });
  }

  onRatingChanged(value: any): void {
    console.log("Incoming value", value)
    const average = (value.newRating + value.currentRating) / 2;
  }

  private getCourses(searchValue?: string): void {
    this.coursesService.getCourses(searchValue).pipe(
      // map(response => response.filter(x => x.name === searchValue)),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.courses = response;
    }, error => {
      this.toastr.error('Some error occurred while fetching courses.')
    });
  }

  private checkAdminRole = (): boolean => {
    const user = this.authService.getLoggedUser();
    if (user.roleId == Role.Admin) {
      return true;
    }
    return false;
  }
}
