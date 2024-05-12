import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd , RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  {

  loggedIn: boolean = false;
  user: any;
  greetings: string = '';
  checkAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthStatus();
      }
    });
  }

  checkAuthStatus() {
    const userStr = localStorage.getItem('user');
    this.loggedIn = userStr ? true : false;
    this.user = userStr ? JSON.parse(userStr) : undefined;
    this.greetings = 'Hi ' + (this.user?.lastName || '') + '!';
    this.checkAdmin = this.user?.usertype === 'admin' ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
