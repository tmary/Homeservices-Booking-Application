import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = 'http://localhost:3000/app/feedbacks';

  constructor( private http: HttpClient) { }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl);

  }

  updateResponse(feedbackId: number, response: string): Observable<any>{
    const url = '${this.feedbackUrl}/${feedbackId}';
    const body = { response};
    return this.http.put(url, body);

  }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.feedbackUrl, feedback);
  }
}
