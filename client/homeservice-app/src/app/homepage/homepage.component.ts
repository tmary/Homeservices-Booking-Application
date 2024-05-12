import { Component , OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceAreasComponent } from '../service-areas/service-areas.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../model/feedback.model';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,ServiceAreasComponent, RouterModule, FeedbackComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  title= ' Home Services Company';
  feedbacks: Feedback[] = [];

  constructor(private router: Router, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedback().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }

  getServiceName(serviceId:number): string {
    return 'Service Name';
  }

  navigate() {
    this.router.navigate(['/service-areas']).catch(err => console.error('Navigation error:', err));
  }
}
