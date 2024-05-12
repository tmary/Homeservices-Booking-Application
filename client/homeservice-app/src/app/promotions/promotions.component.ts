import { Component, OnInit, Input } from '@angular/core';
import { PromotionsService } from '../promotions.service';
import { CommonModule } from '@angular/common';
import { Promotion } from '../model/promotions.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit {
 @Input() isModalOpen: boolean = false;
  isAddPromotionModalOpen: boolean = false;
  promotions!: Promotion[];
  columns = ['title','description', 'discount', 'validityPeriod'];
    title: string =  '';
    description: string='';
    discount!: number;
    validityPeriod:  string ='';
    createdAt: Date = new Date;
    updatedAt:Date = new Date;
    id: number =0;

  constructor(private promotionService: PromotionsService, private router: Router) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions():void {
    this.promotionService.getPromotions().subscribe(promotions => {
      this.promotions = promotions;
    });
  }

  onSubmit():void {
    const promotionData = {
      title: this.title,
      description: this.description,
      discount:this.discount,
      validityPeriod:this.validityPeriod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      id: this.id
    };
    this.promotionService.createPromotion(promotionData).subscribe(response => {
      console.log('Promotion created successfully:', response);
      this.loadPromotions();
    }, error => {
      if( error instanceof HttpErrorResponse) {
        console.error('Error creating promotion:', error.status, error.statusText);
        console.error('Response body:', error.error);
      } else {
        console.error('An unexpected error occured :', error);
      }

    });
  }

  openAddPromotionModal() {
    this.isAddPromotionModalOpen = true;
  }

  closeAddPromotionModal() {
    this.isAddPromotionModalOpen = false;
  }

}
