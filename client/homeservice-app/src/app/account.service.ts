import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = 'http://localhost:3000/app/account-mgt/admin';

  constructor(private http: HttpClient, private router: Router ) { }


  createAdminUser(email: string, password: string): Observable<any> {
   const token = localStorage.getItem('token');
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token} `
   });
    return this.http.post<any>(this.accountUrl,{email, password}, { headers: headers});
  }

}
