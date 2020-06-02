import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    readonly loggedUserStorageKey = 'loggedUser';

    private hasLoggedIn$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/Users`);
    }

    getUserById(id: number): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/Users/${id}`);
    }

    login(email: string, password: string): Observable<User> {
        return this.getUsers().pipe(
            map((response: User[]) => response.find(user => user.email === email && user.password === password))
        );
    }

    register(user: User): Observable<User> {
        const userToAdd = {
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "isBlocked": false,
            "roleId": 0,
            "favouriteCourses": []
        }
        return this.http.post<User>(`${environment.apiUrl}/Users`, userToAdd);
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

    logout(): void {
        localStorage.removeItem(this.loggedUserStorageKey);

        this.setHasLoggedIn(false);
    }

    setLoggedUser(user: User): void {
        localStorage.setItem(this.loggedUserStorageKey, JSON.stringify(user));

        this.setHasLoggedIn(true);
    }

    getLoggedUser(): User {
        return JSON.parse(localStorage.getItem(this.loggedUserStorageKey));
    }

    getLoggedUserId(): number {
        const user = this.getLoggedUser();
        return user.id;
    }

    setHasLoggedIn(isLogged: boolean): void {
        this.hasLoggedIn$.next(isLogged);
    }

    getHasLoggedIn(): Observable<boolean> {
        if (this.getLoggedUser()) {
            return of(true);
        }

        return this.hasLoggedIn$.asObservable();
    }
}
