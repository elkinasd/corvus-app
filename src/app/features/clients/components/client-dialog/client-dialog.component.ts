import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.scss',
})
export class ClientDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientDialogComponent>);

  clientForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    document: ['', [Validators.pattern('^[0-9]+$')]], // Cédula o NIT opcional por ahora
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    type: ['Prospecto', [Validators.required]],
    origin: [''], // Cómo nos conoció
  });

  save() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
