import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking} from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingUrl = 'http://localhost:3000/app/bookings';

  constructor(private http: HttpClient) { }

  submitBooking(bookingData: Booking): Observable<Booking> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token} `
    });
    return this.http.post<Booking>(this.bookingUrl,bookingData, {headers});
  }

  cancelBooking(id: number): Observable<any> {
    const url = '${this.bookingUrl}/${id}';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token} `
    });
    return this.http.delete(url, {headers: headers});
  }

  getBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token} `
    })
    return this.http.get<Booking[]>(this.bookingUrl, { headers: headers});
  }
}
