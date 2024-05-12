import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceArea } from './model/service-areas.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceAreasService {
  private serviceAreasUrl = 'http://localhost:3000/app/service-areas';

  constructor(private http: HttpClient) { }

  getServiceAreas(): Observable<ServiceArea[]> {
    return this.http.get<ServiceArea[]>(this.serviceAreasUrl);
  }

  updatedServiceAreas(provider: ServiceArea): Observable<void> {
    const updateUrl = '${this.serviceAreasUrl}/${provider.id}/service-areas';
    const updatedProvider = {...provider, serviceAreas:provider.areasOfService };
    return this.http.put<void>(updateUrl,updatedProvider);
  }

  deleteServiceArea(id: number): Observable<any> {
    return this.http.delete('${this.serviceAreasUrl}/${id}');
  }
}
