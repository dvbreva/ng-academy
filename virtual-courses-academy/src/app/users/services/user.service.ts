import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';

import { User } from '../../auth/models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/Users`);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(`${environment.apiUrl}/Users/${id}`);
    }

    blockUser(user: User): Observable<User> {
        const data = {
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "isBlocked": true,
            "roleId": user.roleId,
            "favouriteCourses": user.favouriteCourses
        }
        return this.http.put<User>(`${environment.apiUrl}/Users/${user.id}`, data);
    }

    updateBasicInfo(user: User, formData: any): Observable<User> {
        const data = {
            "name": formData.name,
            "email": user.email,
            "password": user.password,
            "isBlocked": user.isBlocked,
            "roleId": user.roleId,
            "favouriteCourses": user.favouriteCourses
        }

        return this.http.put<User>(`${environment.apiUrl}/Users/${user.id}`, data);
    }

    changePassword(user: User, formData: any): Observable<User> {
        if(formData.password != formData.confirmPassoword) {
            return throwError("Passwords do not match!");
        }

        const data = {
            "name": user.name,
            "email": user.email,
            "password": formData.password,
            "isBlocked": user.isBlocked,
            "roleId": user.roleId,
            "favouriteCourses": user.favouriteCourses
        }
        return this.http.put<User>(`${environment.apiUrl}/Users/${user.id}`, data);
    }
}
