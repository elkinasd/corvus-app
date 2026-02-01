import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-guard-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule
    ],
    template: `
    <h2 mat-dialog-title>🔐 Requiere Permisos de Administrador</h2>
    <mat-dialog-content>
      <p>Mover un cliente ganado a otro estado requiere autorización.</p>
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Clave de Administrador</mat-label>
        <input matInput [(ngModel)]="password" type="password" (keyup.enter)="verify()">
      </mat-form-field>
      @if (error){
        <p class="text-red-500 text-sm">{{ error }}</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">Cancelar</button>
      <button mat-raised-button color="warn" (click)="verify()">Autorizar</button>
    </mat-dialog-actions>
  `,
    styles: [`
    .w-full { width: 100%; }
  `]
})
export class AdminGuardDialogComponent {
    private dialogRef = inject(MatDialogRef<AdminGuardDialogComponent>);
    password = '';
    error = '';

    verify() {
        if (this.password === 'admin123') { // Simulación de clave
            this.dialogRef.close(true);
        } else {
            this.error = 'Clave incorrecta';
            this.password = '';
        }
    }

    close(result: boolean) {
        this.dialogRef.close(result);
    }
}
