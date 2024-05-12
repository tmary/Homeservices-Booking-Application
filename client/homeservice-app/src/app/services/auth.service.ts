import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { UserRole } from '../shared/user-role.enum';
import { Router } from '@angular/router';
import {map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUrl = 'http://locahost:3000/app/login';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private currentUserRole: UserRole| null = null;


  constructor(private http: HttpClient, private router: Router) {
    this.checkAuth().subscribe(isAuth => {
      this.isLoggedIn.next(isAuth);
    });
   }
   hasToken(): boolean {
    return !!localStorage.getItem('token');
   }

   // login
   login(email: string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<{token: string}>('http://localhost:3000/app/login', body, {withCredentials: true}).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        this.isLoggedIn.next(true);
        return response;
      })
    );
  }

  register(user: User): Observable<any> {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('firstName', user.firstName);
    body.set('address', user.address);
    body.set('lastName', user.lastName);
    body.set('password', user.password);

    return this.http.post('http://localhost:3000/app/register', user);
  }

  logout(): void {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
    this.http.post('http://localhost:3000/app/logout', {} ,{withCredentials: true, responseType: 'text'}).subscribe(
      () => this.router.navigate(['/login']));
      this.currentUserRole = null;
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3000/app/checkAuth', {withCredentials: true});
  }

  isAuthenticated(): Observable<boolean> {
    return this,this.isLoggedIn.asObservable();
  }

  setToken(token:string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  setCurrentUserRole(role: UserRole | null): void {
    this.currentUserRole = role;
  }

  getCurrentUserRole(): UserRole | null {
    return this.currentUserRole;
  }

  isUser(): boolean {
    return this.currentUserRole === UserRole.User;
  }

  isAdmin(): boolean {
    return this.currentUserRole === UserRole.Admin;
  }


}
