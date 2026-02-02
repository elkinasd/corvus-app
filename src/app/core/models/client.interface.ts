export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: 'Inversionista' | 'Comprador' | 'Prospecto';
    status: 'Activo' | 'Inactivo' | 'VIP';
    lastActivity: string;
}
