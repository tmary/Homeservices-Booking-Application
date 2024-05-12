import { Component , OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './booking-management.component.html',
  styleUrl: './booking-management.component.scss'
})
export class BookingManagementComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((data:any[]) => {
      this.bookings = data;
    }, (error) => {
      console.error('Error fetching bookings', error);
    });
  }

}
