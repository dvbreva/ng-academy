import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  @Input() course: Course;

  @Output() courseSelected = new EventEmitter<number>();
  @Output() courseDeleted = new EventEmitter<number>();
  @Output() ratingChanged = new EventEmitter<{id: number, currentRating: number, newRating: number}>();

  currentRate: number;

  constructor() {
    this.course = {
      id: 0,
      name: '',
      description: '',
      rating: 0
    };
  }

  getDescription(): string {
    if (this.course.description.length > 100) {
      return `${this.course.description.substr(0, 100)}...`;
    }

    return this.course.description;
  }

  onSelectClick(): void {
    this.courseSelected.emit(this.course.id);
  }

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }

  onRateChange(): void {
    this.ratingChanged.emit({id: this.course.id, currentRating: this.course.rating, newRating: this.currentRate});
  }
}
