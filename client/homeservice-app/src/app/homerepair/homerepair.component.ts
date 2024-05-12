import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-homerepair',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './homerepair.component.html',
  styleUrls: ['./homerepair.component.scss']
})
export class HomerepairComponent implements OnInit {
  isAdmin: boolean = true;


  services = [
    {name: 'Plumbing', imageUrl:'./assets/images/plumber.jpg', description:'Professional plumbing services.',rating: 4.5},
    { name: 'Electrical Repair', imageUrl:'./assets/images/elect.jpg', description:'Expert electrical repair.', rating: 5.0},
    { name: 'Painting', imageUrl:'./assets/images/painter2.jpg', description:'Make that space Pop with color.',rating: 4.8},
    {name: 'Mowing', imageUrl:'./assets/images/mowing.jpg', description:'Professional lawn mowers, gardeners.', rating: 3.2},
    {name: 'Furniture Assembling', imageUrl:'./assets/images/furniture.jpg', description:'Assembling beds, closets, chairs and more. ',rating: 4.1},
    {name: 'Cleaning Services', imageUrl:'./assets/images/clean.jpg', description:'Bringing life and shine to that space.',rating: 3.5},

  ];
  constructor(private router: Router, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {

  }

  openBookingDialog():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height ='500px';
    dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(BookingComponent, dialogConfig);

    dialogRef.componentInstance.bookingSuccess.subscribe((success: boolean)=> {
      if (success) {
        console.log('Booking was successful');
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
    });
  }


}
