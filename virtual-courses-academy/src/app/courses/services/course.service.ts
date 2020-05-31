import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/course.interface';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/auth/models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    
    constructor(private http: HttpClient) {
    }

    getCourses(searchValue?: string): Observable<Course[]> {
        if (searchValue) {
            let params = new HttpParams();
            params = params.append('title', searchValue);

            return this.http.get<Course[]>(`${environment.apiUrl}/Courses`, {
                params
            });
        }

        return this.http.get<Course[]>(`${environment.apiUrl}/Courses`);
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${environment.apiUrl}/Courses/${id}`);
    }

    saveCourse(course: Course): Observable<Course> {
        if (course.id) {
           return this.updateCourse(course);
        } else {
            return this.addCourse(course);
        }
    }

    deleteCourse(id: number): Observable<Course> {
        return this.http.delete<Course>(`${environment.apiUrl}/Courses/${id}`);
    }

    addCourseToFavourites(id: number, user: User): Observable<User> {
        if(user.favouriteCourses.indexOf(id) > -1) {
            return throwError("Course was previously added as a favourite.");
        }
        user.favouriteCourses.push(id)
        localStorage.setItem('loggedUser', JSON.stringify(user));
        return this.http.put<User>(`${environment.apiUrl}/Users/${user.id}`, user);
    }

    private addCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${environment.apiUrl}/Courses`, course);
    }

    private updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${environment.apiUrl}/Courses/${course.id}`, course);
    }
}
