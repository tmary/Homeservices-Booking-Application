import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { Feedback } from '../model/feedback.model';
import { FeedbackService } from '../feedback.service';
import { FormsModule } from '@angular/forms';

interface Services {
  id: number;
  name: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
newFeedback: Feedback = {id: 0, serviceId:0, message: '', rating:0,
  timestamp: new Date() };
  selectedServiceId: number = 0;
  services: Services[] = [];

constructor(private  feedbackService: FeedbackService){}
ngOnInit(): void {
  this.fetchServices();
}

fetchServices(): void {
  this.services = [
    { id: 101, name: 'Painting'},
    {id: 102, name: 'Cleaning'},
    {id:103, name: 'Electrical Repair'}
  ];
}

submitFeedback(): void {
  this.newFeedback.serviceId = this.selectedServiceId;
  this.feedbackService.submitFeedback(this.newFeedback).subscribe(() => {
    console.log('Feedback submitted');
    this.newFeedback = { id: 0, serviceId: 0, message: '', rating: 0, timestamp: new Date()};
  },
  error => {
    console.error('Error submmitting feedback:', error);
  });
 }
}
