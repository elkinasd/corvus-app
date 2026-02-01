import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientDialogComponent } from '../clients/components/client-dialog/client-dialog.component';
import { AdminGuardDialogComponent } from './components/admin-guard-dialog/admin-guard-dialog.component';
import { ClientsService } from '../../core/services/clients.service';
import { Column, Lead, TimelineEvent } from '../../core/models/lead.model';
import { LeadsService } from '../../core/services/leads.service';
import { LeadDrawerComponent } from './components/lead-drawer/lead-drawer.component';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    DragDropModule,
    FormsModule,
    LeadDrawerComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss',
})
export class LeadsComponent {
  viewMode: 'board' | 'list' = 'board';

  private leadsService = inject(LeadsService);
  private dialog = inject(MatDialog);
  private clientsService = inject(ClientsService);

  // Usamos el signal del servicio directamente o creamos una propiedad local sincronizada
  columns: Column[] = [];

  constructor() {
    // Sincronizar localmente cuando el signal cambie
    effect(() => {
      // Clonamos para evitar mutaciones directas al signal si el drag&drop es agresivo
      this.columns = JSON.parse(JSON.stringify(this.leadsService.columns()));
    });
  }

  selectedLead: Lead | null = null;

  drop(event: CdkDragDrop<Lead[]>) {
    // 1. Reordenamiento en la misma columna
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.leadsService.updateColumns(this.columns);
      return;
    }

    // 2. Movimiento entre columnas
    const lead = event.previousContainer.data[event.previousIndex];
    const sourceId = event.previousContainer.id;
    const targetId = event.container.id;
    const targetColumn = this.columns.find((c) => c.id === targetId);

    // --- CHECK: ¿Está saliendo de la columna 'won'? ---
    if (sourceId === 'won') {
      // Pedir autorización
      this.openAdminGuard().subscribe((authorized) => {
        if (authorized) {
          // Si autoriza, procedemos con la lógica de transferencia normal
          this.handleTransfer(lead, event, targetColumn);
        } else {
          // Si NO autoriza, no hacemos NADA.
          // Angular CDK revertirá visualmente el cambio.
        }
      });
    } else {
      // Movimiento normal (no sale de won)
      this.handleTransfer(lead, event, targetColumn);
    }
  }

  // Lógica centralizada de transferencia
  handleTransfer(lead: Lead, event: CdkDragDrop<Lead[]>, targetColumn: Column | undefined) {
    // --- CHECK: ¿Está entrando a la columna 'won'? ---
    if (targetColumn && targetColumn.id === 'won') {
      this.openConversionDialog(lead, event, targetColumn);
    } else {
      // Movimiento directo a cualquier otra columna
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Actualizar estado del lead
      if (targetColumn) {
        lead.status = targetColumn.id as Lead['status'];
        this.addSystemEvent(lead, `Movido a ${targetColumn.title}`);
        this.leadsService.updateColumns(this.columns);
      }
    }
  }

  openAdminGuard() {
    return this.dialog
      .open(AdminGuardDialogComponent, {
        width: '400px',
        disableClose: true,
        panelClass: 'premium-modal-panel'
      })
      .afterClosed();
  }

  openConversionDialog(lead: Lead, event: CdkDragDrop<Lead[]>, targetColumn: Column) {
    const names = lead.title.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');

    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'premium-modal-panel',
      data: {
        firstName: firstName,
        lastName: lastName,
        type: 'Comprador',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 1. Confirmado: Mover visualmente ahora
        transferArrayItem(
          event.previousContainer.data, // Data del origen
          event.container.data,         // Data del destino
          event.previousIndex,
          event.currentIndex
        );

        // 2. Crear Cliente Real
        this.clientsService.addClient({
          name: `${result.firstName} ${result.lastName}`,
          email: result.email,
          phone: result.phone,
          type: result.type,
          status: 'Activo'
        });

        // 3. Actualizar Lead y Persistir
        lead.status = 'won';
        this.addSystemEvent(lead, `¡Venta Cerrada! Convertido a Cliente: ${result.firstName}`);
        this.addSystemEvent(lead, `Movido a ${targetColumn.title}`);

        this.leadsService.updateColumns(this.columns);

      }
      // Si cancela, no hacemos nada: el item se queda en el origen porque no llamamos transferArrayItem
    });
  }

  openLeadDetails(lead: Lead) {
    this.selectedLead = lead;
  }

  closeLeadDetails() {
    this.selectedLead = null;
  }

  private addSystemEvent(lead: Lead, message: string) {
    const event: TimelineEvent = {
      id: Date.now().toString(),
      type: 'system',
      title: 'Sistema',
      description: message,
      date: new Date(),
    };

    if (!lead.timeline) lead.timeline = [];
    lead.timeline.unshift(event);
  }

  // Helper para obtener todos los leads en una sola lista plana
  getAllLeads(): Lead[] {
    return this.columns.flatMap((col) => col.leads);
  }
}
