import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent  implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
  }

}
