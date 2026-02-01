import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Client } from '../../../../core/models/client.model';

@Component({
  selector: 'app-client-drawer',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: './client-drawer.component.html',
  styleUrl: './client-drawer.component.scss',
})
export class ClientDrawerComponent {
  client: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    public dialogRef: MatDialogRef<ClientDrawerComponent>
  ) {
    this.client = data;
  }

  isEditing = signal(false);

  closeDrawer() {
    this.dialogRef.close();
  }

  editClient() {
    this.dialogRef.close('edit');
  }
}
