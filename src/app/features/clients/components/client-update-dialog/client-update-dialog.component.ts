import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-client-update-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
  ],
  templateUrl: './client-update-dialog.component.html',
  styleUrl: './client-update-dialog.component.scss',
})
export class ClientUpdateDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientUpdateDialogComponent>);

  // PASO 1: PERSONAL
  personalForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    documentType: ['CC', Validators.required],
    documentNumber: ['', Validators.required],
    expeditionDate: [new Date()],
    expeditionPlace: [''],
    birthDate: [''],
    birthPlace: [''],
    gender: [''],
    civilStatus: ['Soltero'],
    address: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  // PASO 2: FINANCIERO
  financialForm = this.fb.group({
    laborStatus: ['Empleado', Validators.required],
    company: [''],
    position: [''],
    antiquity: [''],
    contractType: [''],
    monthlyIncome: [0, [Validators.required, Validators.min(0)]],
    otherIncome: [0],
    monthlyExpenses: [0, Validators.required],
    assets: [0],
    liabilities: [0],
  });

  // PASO 3: SARLAFT (Declaraciones)
  legalForm = this.fb.group({
    isPep: [false],
    hasForeignCurrency: [false],
    originFunds: ['', Validators.required],
    dataTreatment: [false, Validators.requiredTrue],
    sarlaftCheck: [false, Validators.requiredTrue],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data) {
      let fName = '';
      let lName = '';
      if (this.data.name) {
        const parts = this.data.name.split(' ');
        if (parts.length > 0) {
          fName = parts[0];
          lName = parts.slice(1).join(' ');
        }
      }

      this.personalForm.patchValue({
        firstName: this.data.firstName || fName,
        lastName: this.data.lastName || lName,
        documentNumber: this.data.documentNumber || '',
        email: this.data.email || '',
        phone: this.data.phone || '',
        city: this.data.city || '',
        address: this.data.address || '',
        expeditionPlace: this.data.expeditionPlace || '',
        civilStatus: this.data.civilStatus || '',
      });

      this.financialForm.patchValue({
        laborStatus: this.data.laborStatus || '',
        company: this.data.company || '',
        position: this.data.position || '',
        monthlyIncome: this.data.monthlyIncome || 0,
        monthlyExpenses: this.data.monthlyExpenses || 0,
        assets: this.data.assets || 0,
        liabilities: this.data.liabilities || 0,
      });

      this.legalForm.patchValue({
        originFunds: this.data.originFunds || '',
      });
    }
  }

  saveAll() {
    if (
      this.personalForm.valid &&
      this.financialForm.valid &&
      this.legalForm.valid
    ) {
      const fullData = {
        personal: this.personalForm.value,
        financial: this.financialForm.value,
        legal: this.legalForm.value,
      };
      this.dialogRef.close(fullData);
    } else {
      this.personalForm.markAllAsTouched();
      this.financialForm.markAllAsTouched();
      this.legalForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
