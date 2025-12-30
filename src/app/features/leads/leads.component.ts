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
    MatIconModule, // <--- Agregado
    MatButtonModule, // <--- Agregado
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
      ],
    },
    {
      id: 'visit',
      title: 'Visita Agendada',
      leads: [],
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
              title: 'Llamada saliente',
              description:
                'Cliente interesado en ver el showroom. Se agendó cita para el martes.',
              date: new Date(new Date().setHours(new Date().getHours() - 2)),
            },
            {
              id: 'e11',
              type: 'email',
              title: 'Email enviado',
              description: 'Envío de cotización preliminar v1.pdf',
              date: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
            {
              id: 'e12',
              type: 'system',
              title: 'Cambio de estado',
              description: 'El lead movido de Nuevos a Contactados.',
              date: new Date(new Date().setDate(new Date().getDate() - 3)),
            },
          ],
        },
      ],
    },
    {
      id: 'option',
      title: 'Opcionados',
      leads: [
        {
          id: '5',
          title: 'Elkin Villalobos',
          company: 'Proyecto Corvus',
          value: 150000,
          status: 'option',
        },
      ],
    },
    {
      id: 'negotiation',
      title: 'Cierre',
      leads: [],
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
      const toColumnTitle =
        event.container.element.nativeElement
          .closest('.column')
          ?.querySelector('h2')
          ?.textContent?.split('(')[0]
          .trim() || 'Nueva Columna';

      this.addSystemEvent(lead, `Movido a ${toColumnTitle}`);
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
