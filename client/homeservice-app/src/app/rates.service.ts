import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatesComponent } from './rates/rates.component';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(RatesComponent, {
      width: '500px',
      height: '400px',
    });
  }
}
