import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatProgressSpinnerModule ,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;



  constructor(private fb: FormBuilder,private router: Router,private userService: UserService,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
   }

  login(): void {
    this.isLoading = true;
    const { email, password }= this.loginForm.value;
    if (this.loginForm.valid) {
        this.authService.login(email,password).subscribe({
          next:(data) => {
            if(data) {
              console.log(data);
              //this.authService.setToken(data.token);
              this.isLoading = false;
              const username = '';
              this.router.navigate(['/homepage'], { queryParams: { username: username}});
            }
          }, error:(err) => {
            console.log(err);
            this.isLoading = false;
          },
          complete: () => this.isLoading = false
        });
    } else {
      this.isLoading = false;
      this.loginForm.markAllAsTouched();
    }
  }

  navigate(route:string): void{
    this.router.navigate([route]);
  }
  openRegistrationPage(){
    this.router.navigateByUrl("/signup");
  }

}
