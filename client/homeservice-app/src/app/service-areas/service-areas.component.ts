import { Component, OnInit } from '@angular/core';
import { ServiceArea } from '../model/service-areas.model';
import { ServiceAreasService } from '../service-areas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-service-areas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-areas.component.html',
  styleUrl: './service-areas.component.scss'
})
export class ServiceAreasComponent implements OnInit {
  serviceAreas: ServiceArea[] = [];
  newServiceArea: string = '';
  isAdmin: boolean= false;
  constructor(private serviceAreasService: ServiceAreasService, private router: Router
    , private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchServiceAreas();
    this.isAdmin = this.authService.isAdmin();
  }

  fetchServiceAreas(): void {
    this.serviceAreasService.getServiceAreas().subscribe((serviceAreas: ServiceArea[]) => {
      this.serviceAreas = serviceAreas;
    },
  (error:any) => {
    console.error('Error fetching service providers:', error);
   });
  }

  addServiceArea(providerId: number): void {
    const providerIndex = this.serviceAreas.findIndex(provider => provider.id === providerId);
    if (providerIndex! == -1 && this.newServiceArea.trim() ! == '') {
      this.serviceAreas[providerIndex].areasOfService.push(this.newServiceArea.trim());
      this.editServiceArea(this.serviceAreas[providerIndex]);
      this.newServiceArea = '';
    }
  }

  editServiceArea(ServiceArea: ServiceArea): void {
    this.serviceAreasService.updatedServiceAreas(ServiceArea).subscribe(() => {
      console.log('Service area updated successfully');
    },
 ( error: any) => {
 });
  }

  deleteServiceArea(id: number): void {
    this.serviceAreasService.deleteServiceArea(id).subscribe(() => {
      console.log('service area deleted successfully');
      this.serviceAreas = this.serviceAreas.filter(sa => sa.id ! == id);
    }, error => {
      console.error('Error deleting service area:', error);
    });

  }
}
