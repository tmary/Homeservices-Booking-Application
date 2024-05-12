import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Earnings } from './model/earnings.model';
import { Statistics } from './model/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private earningsUrl = 'http://localhost:3000/app/earnings';
  private statisticsUrl = 'http://localhost:3000/app/statistics';

  constructor(private http: HttpClient) { }

  getEarnings(): Observable<Earnings> {
    return this.http.get<Earnings>(this.earningsUrl)
  }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.statisticsUrl)
  }

  private handleError(error:any): Observable<any> {
    console.error('An error occured', error);
    return throwError(error.message || error);
  }
}
