import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoursesService } from '../../services/course.service';
import { Course } from '../../models/course.interface';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  formGroup: FormGroup;
  course: Course;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CoursesService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const course = this.formGroup.value;

    this.courseService.saveCourse(course).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/courses/dashboard'])
      this.toastr.success('Success!', 'Successfully added course!');
    }, error => {
      this.toastr.error('Error..', 'Some error occurred.')
    });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      rating: [''],
    });
  }
}

