import { Injectable, signal, computed } from '@angular/core';
import { Column, Lead, TimelineEvent } from '../models/lead.model';

@Injectable({
    providedIn: 'root',
})
export class LeadsService {
    // 1. Estado Inicial (Definición de Columnas y sus Leads)
    private readonly _columns = signal<Column[]>([
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
            id: 'negotiation',
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
            id: 'won',
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
            ],
        },
    ]);

    // 2. Selectores
    columns = this._columns.asReadonly();

    // Example derived signal: Total value in pipeline
    totalPipelineValue = computed(() => {
        return this.columns().reduce((total, col) => {
            return total + col.leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
        }, 0);
    });

    // 3. Acciones

    moveLead(leadId: string, targetColumnId: string, newIndex: number) {
        // Esta lógica es compleja para Signals inmutables profundos, pero aquí va una implementación simplificada
        // Normalmente copiaríamos todo el estado. Para simplicidad de demo, mutaremos clonando.

        // Obtener estado actual
        const currentColumns = JSON.parse(JSON.stringify(this._columns()));
        let sourceColumn: any;
        let targetColumn: any;
        let leadMoved: any;

        // Buscar y remover
        for (const col of currentColumns) {
            const leadIndex = col.leads.findIndex((l: any) => l.id === leadId);
            if (leadIndex > -1) {
                sourceColumn = col;
                leadMoved = col.leads.splice(leadIndex, 1)[0];
                break;
            }
        }

        if (!leadMoved) return; // No encontrado

        // Buscar target y añadir
        targetColumn = currentColumns.find((c: any) => c.id === targetColumnId);
        if (targetColumn) {
            // Actualizar estado del lead
            leadMoved.status = targetColumnId;

            // Añadir evento al timeline
            if (!leadMoved.timeline) leadMoved.timeline = [];
            leadMoved.timeline.unshift({
                id: Date.now().toString(),
                type: 'system',
                title: 'Sistema',
                description: `Movido a ${targetColumn.title}`,
                date: new Date()
            });

            // Insertar en nueva posición
            targetColumn.leads.splice(newIndex, 0, leadMoved);

            // Actualizar Signal
            this._columns.set(currentColumns);
        }
    }

    // Método simple para actualizar todo el array de columnas (usado por el CDK drop event directamente si preferimos manejarlo así)
    updateColumns(newColumns: Column[]) {
        this._columns.set(newColumns);
    }
}
