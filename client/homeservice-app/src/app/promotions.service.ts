import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from './model/promotions.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private promotionsUrl = 'http://localhost:3000/app/promotions';

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.promotionsUrl);
  }

  createPromotion(promotionData: Promotion): Observable<Promotion>{
    return this.http.post<Promotion>(this.promotionsUrl, promotionData);
  }

  updatePromotion(promotionId: number, promotionData: Promotion): Observable<any>{
    const url = '${this.promotionsUrl}/${promotionId}';
    return this.http.put<Promotion>(url, promotionData);
  }

  deletePromotion(promotionId: number): Observable<any> {
    const url = '${this.promotionsUrl}/${promotionId}';
    return this.http.delete<Promotion>(url);
  }
}
