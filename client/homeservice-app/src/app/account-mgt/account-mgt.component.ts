import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService, } from '../account.service';
import { User, NotificationPreferences } from '../model/User';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-mgt',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule
    ,CommonModule, MatFormFieldModule, MatCardModule],
  templateUrl: './account-mgt.component.html',
  styleUrl: './account-mgt.component.scss'
})
export class AccountMgtComponent  implements OnInit {
  adminCreationForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.adminCreationForm = this.fb.group({
      password:['',Validators.required],
      email:['',[Validators.required, Validators.email]]

    });
  }

  createAdminUser(): void {
    if(this.adminCreationForm.valid) {
      const { email, password} = this.adminCreationForm.value;
      this.accountService.createAdminUser(email, password).subscribe(response => {
        console.log('Admin user created successfully:', response);
        this.router.navigate(['/dashboard']);

      },
    error => {
      console.error('Error creating Admin user:', error);
      alert('Failed to create admin user: ' + error.message);
    });

  } else {
    alert('Please check your form for erors');
    this.adminCreationForm.markAllAsTouched();
  }
  }

  openAddPromotion(): void {
    this.router.navigate(['/promotions']);
  }

  openBookingMgt(): void {
    this.router.navigate(['/booking-management']);
  }

  openAddService(): void {
    this.router.navigate(['/service-list']);
  }
}
