import { Injectable, signal, computed } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    // 1. El Estado (The State) - Single Source of Truth
    private readonly _clients = signal<Client[]>([
        {
            id: '1',
            name: 'Juan Perez',
            email: 'juan.perez@gmail.com',
            phone: '+57 300 123 4567',
            type: 'Inversionista',
            status: 'VIP',
            lastActivity: '2025-12-28',
        },
        {
            id: '2',
            name: 'Maria Garcia',
            email: 'maria.g@outlook.com',
            phone: '+57 310 987 6543',
            type: 'Comprador',
            status: 'Activo',
            lastActivity: '2025-11-15',
        },
        {
            id: '3',
            name: 'Carlos Rodriguez',
            email: 'crodriguez@empresa.com',
            phone: '+57 315 555 1122',
            type: 'Prospecto',
            status: 'Activo',
            lastActivity: '2025-12-30',
        },
        {
            id: '4',
            name: 'Ana Martinez',
            email: 'ana.martinez@yahoo.com',
            phone: '+57 320 444 8899',
            type: 'Comprador',
            status: 'Inactivo',
            lastActivity: '2024-08-10',
        },
        {
            id: '5',
            name: 'Luisa Fernanda',
            email: 'luisa.fer@gmail.com',
            phone: '+57 300 222 3344',
            type: 'Inversionista',
            status: 'VIP',
            lastActivity: '2025-12-01',
        },
        {
            id: '6',
            name: 'Pedro Pablo',
            email: 'pedro.pablo@gmail.com',
            phone: '+57 311 111 2222',
            type: 'Prospecto',
            status: 'Activo',
            lastActivity: '2026-01-02',
        },
        {
            id: '7',
            name: 'Sofia Vergara',
            email: 'sofia.v@hollywood.com',
            phone: '+1 555 666 7777',
            type: 'Inversionista',
            status: 'VIP',
            lastActivity: '2026-01-03',
        },
        {
            id: '8',
            name: 'Mario Bros',
            email: 'mario@nintendo.com',
            phone: '+81 90 1234 5678',
            type: 'Comprador',
            status: 'Activo',
            lastActivity: '2025-10-10',
        },
        {
            id: '9',
            name: 'Luigi Bros',
            email: 'luigi@nintendo.com',
            phone: '+81 90 8765 4321',
            type: 'Prospecto',
            status: 'Inactivo',
            lastActivity: '2025-09-09',
        },
        {
            id: '10',
            name: 'Peach Toledo',
            email: 'peach@castle.com',
            phone: '+81 90 1111 2222',
            type: 'Inversionista',
            status: 'VIP',
            lastActivity: '2025-12-25',
        },
        // ... más datos simulados si es necesario, pero con esto basta para la demo
    ]);

    // 2. Selectores (Expose Read-Only Signals)
    clients = this._clients.asReadonly();

    // Computed Signals (Ejemplos de selectores derivados)
    vipClients = computed(() => this.clients().filter(c => c.status === 'VIP'));
    activeClients = computed(() => this.clients().filter(c => c.status === 'Activo'));

    constructor() {
        // Aquí podríamos cargar de localStorage o API
        console.log('ClientsService initialized with', this._clients().length, 'clients');
    }

    // 3. Acciones (Methods to mutate state)

    addClient(newClient: Partial<Client>) {
        const client: Client = {
            id: Math.random().toString(36).substr(2, 9),
            name: newClient.name || 'Sin Nombre',
            email: newClient.email || '',
            phone: newClient.phone || '',
            type: newClient.type || 'Prospecto',
            status: 'Activo', // Default
            lastActivity: new Date().toISOString(),
            ...newClient
        };

        this._clients.update(current => [client, ...current]);
    }

    updateClient(updatedClient: Client) {
        this._clients.update(current =>
            current.map(c => c.id === updatedClient.id ? updatedClient : c)
        );
    }

    deleteClient(id: string) {
        this._clients.update(current => current.filter(c => c.id !== id));
    }
}
