import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Course } from '../../models/course.interface';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/course.service';

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
        private courseService: CoursesService) {
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
        ).subscribe(() =>
            this.router.navigate(['/courses/dashboard']));
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


