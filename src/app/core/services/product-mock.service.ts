import { Injectable, signal } from '@angular/core';
import { ProductDetail } from '../models/product-detail.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductMockService {

  // Simulating DB
  private _mockProduct: ProductDetail = {
    id: '1',
    name: 'Car Loan',
    version: '2.0.0',
    generalInfo: {
      status: 'sandbox',
      producerTeam: 'Créditos de Consumo',
      spanishName: 'Crédito de Vehículo',
      summary: 'API para la gestión y solicitud de créditos de vehículo para clientes persona natural.',
      description: 'Esta API permite realizar simulaciones, solicitudes y seguimiento de créditos para vehículos nuevos y usados...',
      benefits: [
        'Respuesta inmediata a solicitudes',
        'Integración con concesionarios aliados'
      ]
    },
    useCases: [
      {
        id: 'uc-1',
        title: 'Solicitud de Crédito Digital',
        description: 'El cliente realiza la solicitud 100% digital desde la app móvil.',
        businessStages: [
          { title: 'Validación de Identidad', description: 'Se verifica la identidad del cliente contra bases de datos.' },
          { title: 'Estudio de Crédito', description: 'Se analiza la capacidad de endeudamiento.' }
        ],
        technicalSteps: [
          'Call POST /simulate endpoint',
          'Call POST /request endpoint with user ID'
        ],
        usageConditions: 'El cliente debe tener clave dinámica activa.',
        practicalUses: 'Clientes que desean comprar vehículo sin ir a oficina.'
      }
    ],
    complementaryInfo: {
      additionalDocs: [
        { title: 'Guía de integración', link: 'https://...' },
        { title: 'Swagger', link: 'https://...' }
      ],
      images: []
    }
  };

  getProduct(id: string) {
    // Simulate API delay
    return of(this._mockProduct);
  }
}
