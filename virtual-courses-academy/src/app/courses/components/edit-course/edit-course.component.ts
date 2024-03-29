import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../models/course.interface';
import { CoursesService } from '../../services/course.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

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
        this.route.params.pipe(
            takeUntil(this.destroy$))
            .subscribe(params => {
                if (params.id) {
                    this.courseService.getCourseById(params.id).pipe(
                        takeUntil(this.destroy$)
                    ).subscribe(response => {
                        this.course = response;
                        this.buildForm();
                    });
                }
            });

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
            this.router.navigate(['/courses/dashboard']);
            this.toastr.success('Successfully edited course!');
        }, error => {
            this.toastr.error('Some error occurred.')
        });
    }

    private buildForm(): void {
        if (!this.course) {
            this.course = {
                name: '',
                description: '',
                rating: 0
            };
        }

        this.formGroup = this.fb.group({
            id: [this.course.id],
            name: [this.course.name, [Validators.required, Validators.minLength(5)]],
            description: [this.course.description, [Validators.required]],
            rating: [this.course.rating]
        });
    }
}


