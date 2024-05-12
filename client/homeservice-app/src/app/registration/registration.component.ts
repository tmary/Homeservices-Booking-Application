import { CommonModule, NgIf , Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  registrationForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private http:HttpClient,
    private authService: AuthService
  ) { }

    ngOnInit() {
      this.registrationForm = this.formBuilder.group ({
        email:[ '', [ Validators.required, Validators.email]],
        firstName:[''],
        lastName:[''],
        address:[''],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['',Validators.required]
      }, {
        validator:this.mustMatch('password', 'confirmPassword')
      })

    }

    mustMatch(controlName: string, matchControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchControlName];

        if (matchingControl.errors && matchingControl.errors['mustMatch']) {
          return;
        }

        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    }



    onSubmit(){
      if (this.registrationForm.valid){
        console.log('Form data:', this.registrationForm.value);
        this.authService.register(this.registrationForm.value).subscribe({
          next:(data) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error:(err) => {
            console.log(err);
          }
      });
      } else {
        console.log('Form is not valid.');
      }
    }

    openLoginPage() {
        this.location.back();
    }
}
