import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:3000/app/users';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  login(email: any, password:any): Observable<any> {
    let body = new URLSearchParams();
    body.set('username',email);
    body.set('password',password);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

   return this.http.post(this.userUrl + '/login',body.toString(),{

   });

  }
}
