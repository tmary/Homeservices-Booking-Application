import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit , inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatDialogContent,
    MatDialogActions,MatDialogClose, MatFormFieldModule,MatInputModule,MatButtonModule
  ],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss'
})
export class RatesComponent implements OnInit {
  ratesForm!: FormGroup;
  formBuilder: any;

  //constructor(private formBuilder: FormBuilder) {}

  constructor(private dialogRef: MatDialogRef<RatesComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.ratesForm = this.formBuilder.group({
      service1:['', Validators.required],
      service2:['', Validators.required],
    });
  }
  onSubmit(): void {
    console.log(this.ratesForm.value);
  }
}
