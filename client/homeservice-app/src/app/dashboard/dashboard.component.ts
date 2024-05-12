import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CommonModule } from '@angular/common';
import { Earnings } from '../model/earnings.model';
import { Statistics } from '../model/statistics.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  earningsData: Earnings | undefined;
  statisticsData: Statistics | undefined;

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.fetchEarningsData();
    this.fetchStatisticsData();
  }

  fetchEarningsData(): void {
        this.dashboardService.getEarnings().subscribe(earnings => {
      this.earningsData = earnings;
    }, error => {
      console.error('Error fetching earnings data', error);
    }
    );
  }

  fetchStatisticsData(): void {
     this.dashboardService.getStatistics().subscribe(statistics => {
      this.statisticsData = statistics;
    }, error => {
      console.error('Error fetching statistics data:', error);
    });
  }

}
