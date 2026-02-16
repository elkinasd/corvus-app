import { Injectable } from '@angular/core';
import { ProductDetail } from './product-detail.interface';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductMockService {

    // Simulating DB with multiple products
    private _products: ProductDetail[] = [
        {
            id: '1',
            name: 'Car Loan',
            version: '2.0.0',
            generalInfo: {
                status: 'production',
                producerTeam: 'Créditos de Consumo',
                spanishName: 'Préstamo de Vehículo',
                summary: 'API para la gestión y solicitud de créditos vehiculares.',
                description: 'Permite a los clientes solicitar, consultar y gestionar sus créditos para la compra de vehículos nuevos o usados.',
                benefits: [
                    'Aprobación en línea en minutos.',
                    'Tasas competitivas del mercado.',
                    'Plazos flexibles de pago.'
                ],
                useCases: 'Ideal para concesionarios que desean integrar financiación en su punto de venta, o para apps de venta de autos.'
            },
            functionalDetail: {
                stages: [
                    'El cliente selecciona el vehículo.',
                    'El cliente solicita la financiación.',
                    'El sistema evalúa el riesgo crediticio.',
                    'Se aprueba o rechaza la solicitud.',
                    '',
                    ''
                ],
                usageConditions: 'Requiere autenticación OAuth 2.0 y certificado digital válido.'
            },
            complementaryInfo: {
                additionalDocs: [
                    { title: 'Guía de integración', link: '#' },
                    { title: 'Especificación OpenAPI', link: '#' }
                ],
                images: []
            }
        },
        {
            id: '2',
            name: 'Savings Account',
            version: '1.5.0',
            generalInfo: {
                status: 'sandbox',
                producerTeam: 'Cuentas de Ahorro',
                spanishName: 'Cuenta de Ahorros',
                summary: 'API para apertura y gestión de cuentas de ahorro.',
                description: 'Permite la creación de cuentas de ahorro 100% digitales con validación de identidad biométrica.',
                benefits: [
                    'Apertura sin papales.',
                    'Cero costos de manejo.',
                    'Rentabilidad asegurada.'
                ],
                useCases: 'Integración con billeteras digitales y neobancos.'
            },
            functionalDetail: {
                stages: [
                    'Validación de identidad.',
                    'Creación de cuenta.',
                    'Generación de tarjeta virtual.',
                    '', '', ''
                ],
                usageConditions: 'Cumplimiento normativo KYC.'
            },
            complementaryInfo: {
                additionalDocs: [
                    { title: 'Legal', link: '#' }
                ],
                images: []
            }
        }
    ];

    searchProducts(term: string) {
        const termLower = term.toLowerCase();

        let results = this._products;

        if (termLower) {
            results = this._products.filter(p =>
                p.name.toLowerCase().includes(termLower) ||
                p.generalInfo.spanishName.toLowerCase().includes(termLower)
            );
        }

        return of(results.map(p => ({
            id: p.id,
            title: p.name,
            description: p.generalInfo.summary,
            category: 'API Bancolombia',
            icon: 'api'
        })));
    }

    getProduct(id: string) {
        const product = this._products.find(p => p.id === id);
        return of(product || this._products[0]);
    }
}
