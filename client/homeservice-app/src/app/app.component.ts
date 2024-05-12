import { Component , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from './booking/booking.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,FooterComponent,
        LoginComponent,
        RegistrationComponent,CommonModule,
        BookingComponent, NavbarComponent]
})
export class AppComponent  implements OnInit {
  showLogoutButton = false;
  title = 'Home Service Booking System';

  constructor(private modalService: NgbModal, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.showLogoutButton = isAuthenticated;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
