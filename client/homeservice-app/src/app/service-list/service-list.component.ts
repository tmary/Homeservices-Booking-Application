import { CommonModule } from '@angular/common';
import { Component , OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatesComponent } from '../rates/rates.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RatesService } from '../rates.service';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RatesComponent, MatDialogModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent  implements OnInit {
  serviceForm: FormGroup;
  services: any[] = []; // Assuming this is where your services data is stored

  constructor(private formBuilder: FormBuilder, private ratesService: RatesService) {
    this.serviceForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      // Add more form controls as needed
    });
  }

  ngOnInit(): void {
    this.services = [
      {id: 1, name: 'Cleaning', description: 'Professional cleaning services'},
      { id: 2, name: 'Plumbing', description: 'Expert plumbing solutions' },
    ];
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      // Add the new service to the list
      this.services.push(this.serviceForm.value);
      // Clear the form
      this.serviceForm.reset();
    }
  }

  editService(index: number): void {
    // this.services[index] = updatedServiceData;
    const serviceToUpdate = this.services[index];

  this.serviceForm.patchValue({
    serviceName: serviceToUpdate.serviceName,
    serviceDescription: serviceToUpdate.serviceDescription,
    // Update other form controls as needed
  });
  }

  deleteService(index: number): void {
    this.services.splice(index, 1);
  }


  openPopupDialog(): void {
    this.ratesService.openDialog();
  }

}
