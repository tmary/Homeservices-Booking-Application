import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../booking.service';
import { Booking } from '../model/booking.model';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent  implements OnInit {
  selectedService: number | undefined;
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  @Output() bookingSuccess = new EventEmitter<boolean>;


  services: { id : number, name: string}[] = [
    {id: 1, name: 'Plumbing'},
    { id: 3, name : 'Gardening'},
    { id: 3, name : 'Assembling Furniture'},
    { id: 4, name : 'Electrical Repair Services'},
    { id: 5, name : 'painting'},
    { id: 6, name : 'Cleaning Services'}

  ];

  constructor(private bookingService: BookingService , private router: Router, private dialogRef: MatDialogRef<BookingComponent>) {}

  ngOnInit(): void {

  }
  submitBooking() : void {
    const bookingData: Booking = {
      id:this.selectedService || 0,
      name:'',
      date: this.selectedDate || new Date(),
      time: this.selectedTime || '',

    };
    this.bookingService.submitBooking(bookingData).subscribe(
      response => {
        console.log('Booking submitted', response);
        this.bookingSuccess.emit(true);
        this.dialogRef.close();
        this.router.navigate(['/']);

      },
      error => {
        console.error('Error submitting booking:', error);
        this.bookingSuccess.emit(false);
      }
    );
  }
}
