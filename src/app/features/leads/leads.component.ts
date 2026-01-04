import { Component } from '@angular/core';
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
import { LeadDrawerComponent } from './components/lead-drawer/lead-drawer.component';
import { Column, Lead, TimelineEvent } from '../../core/models/lead.model';

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

  // Definimos las columnas dinámicamente
  columns: Column[] = [
    {
      id: 'new',
      title: 'Nuevos',
      leads: [
        {
          id: '1',
          title: 'Zelda Villalobos',
          company: 'Residencial Norte',
          value: 5000,
          status: 'new',
          lastActivity: new Date(),
          timeline: [
            {
              id: 'e1',
              type: 'system',
              title: 'Lead creado',
              description: 'Importado desde formulario web',
              date: new Date(new Date().setDate(new Date().getDate() - 2)),
            },
          ],
        },
        {
          id: '2',
          title: 'Tathiana Bermúdez',
          company: 'Remodelación Cocina',
          value: 12000,
          status: 'new',
        },
        {
          id: '101',
          title: 'Constructora Beta',
          company: 'Lote Campestre',
          value: 85000,
          status: 'new',
        },
        {
          id: '102',
          title: 'Andrés López',
          company: 'Renovación Baños',
          value: 3500,
          status: 'new',
        },
        {
          id: '103',
          title: 'Inversiones Omega',
          company: 'Torre Empresarial',
          value: 500000,
          status: 'new',
        },
      ],
    },
    {
      id: 'contacted',
      title: 'Contactados',
      leads: [
        {
          id: '3',
          title: 'Osvaldo Villalobos',
          company: 'Oficinas Centro',
          value: 45000,
          status: 'contacted',
          timeline: [],
        },
        {
          id: '104',
          title: 'María González',
          company: 'Apartamento 502',
          value: 125000,
          status: 'contacted',
        },
        {
          id: '105',
          title: 'Grupo Hotelero',
          company: 'Remodelación Lobby',
          value: 65000,
          status: 'contacted',
        },
      ],
    },
    {
      id: 'visit',
      title: 'Visita Agendada',
      leads: [
        {
          id: '106',
          title: 'Carlos Ruiz',
          company: 'Visita Terreno',
          value: 200000,
          status: 'visit',
        },
        {
          id: '107',
          title: 'Ana María Polo',
          company: 'Casa Modelo',
          value: 180000,
          status: 'visit',
        },
      ],
    },
    {
      id: 'proposal',
      title: 'Cotización',
      leads: [
        {
          id: '4',
          title: 'Elkin Villalobos',
          company: 'Proyecto Corvus',
          value: 150000,
          status: 'proposal',
          timeline: [
            {
              id: 'e10',
              type: 'call',
              title: 'Llamada de Seguimiento',
              description: 'Cliente muy interesado.',
              date: new Date(),
            },
          ],
        },
        {
          id: '108',
          title: 'Eduardo Santos',
          company: 'Ampliación Bodega',
          value: 320000,
          status: 'proposal',
        },
        {
          id: '109',
          title: 'Clínica Santa Fe',
          company: 'Consultorios Nuevos',
          value: 950000,
          status: 'proposal',
        },
        {
          id: '110',
          title: 'Restaurante El Cielo',
          company: 'Adecuación Local',
          value: 45000,
          status: 'proposal',
        },
      ],
    },
    {
      id: 'negotiation', // Antes Option
      title: 'Negoc. / Opcionados',
      leads: [
        {
          id: '5',
          title: 'Elkin Villalobos',
          company: 'Proyecto Corvus',
          value: 150000,
          status: 'negotiation',
        },
        {
          id: '111',
          title: 'Inmobiliaria Gold',
          company: 'Compra Bloque A',
          value: 1200000,
          status: 'negotiation',
        },
        {
          id: '112',
          title: 'Familia Pérez',
          company: 'Casa Quinta',
          value: 450000,
          status: 'negotiation',
        },
      ],
    },
    {
      id: 'won', // Antes Negotiation
      title: 'Cierre / Ganado',
      leads: [
        {
          id: '6',
          title: 'Venta Finalizada',
          company: 'Cliente Feliz S.A.',
          value: 200000,
          status: 'won',
        },
        {
          id: '113',
          title: 'Tech Solutions',
          company: 'Oficinas Nuevas',
          value: 180000,
          status: 'won',
        },
        {
          id: '114',
          title: 'Juan Valdez',
          company: 'Local Comercial',
          value: 350000,
          status: 'won',
        },
      ],
    },
    {
      id: 'inactive',
      title: 'Perdido / Inactivo',
      leads: [
        {
          id: '115',
          title: 'Pedro Pablo',
          company: 'Presupuesto Bajo',
          value: 2000,
          status: 'inactive',
        },
        {
          id: '116',
          title: 'Curioso Sin Plata',
          company: 'Solo preguntaba',
          value: 0,
          status: 'inactive',
        },
      ], // El cementerio de leads
    },
  ];

  selectedLead: Lead | null = null;

  drop(event: CdkDragDrop<Lead[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Registrar evento de movimiento automáticamente
      const lead = event.container.data[event.currentIndex];

      // Buscar la columna destino usando el elemento del DOM si es necesario,
      // pero mejor buscamos en nuestra lista de columnas cuál tiene este array de leads.
      const targetColumn = this.columns.find(
        (c) => c.leads === event.container.data
      );
      if (targetColumn) {
        lead.status = targetColumn.id as Lead['status']; // Actualizar estado del lead
        this.addSystemEvent(lead, `Movido a ${targetColumn.title}`);
      }
    }
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
