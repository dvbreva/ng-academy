import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../models/course.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CoursesService } from '../../services/course.service';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.interface';
import { Role } from 'src/app/utils/enums/role.enum';

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
    private fb: FormBuilder) {
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
        console.log(response)
      }, error => {
        alert(error)
      });
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

  onRatingChanged(value: any): void {
    console.log("Incoming value", value)
    const average = (value.newRating + value.currentRating) / 2;
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

  private checkAdminRole = (): boolean => {
    const user = this.authService.getLoggedUser();
    if(user.roleId == Role.Admin) {
      return true;
    }
    return false;
  }
}
