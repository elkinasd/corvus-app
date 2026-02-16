export interface ProductDetail {
    id: string;
    name: string; // "Car Loan"
    version: string; // "2.0.0"

    // Tab 1: Información General
    generalInfo: {
        status: 'sandbox' | 'production';
        producerTeam: string; // Dropdown value
        spanishName: string;
        summary: string; // "Entradilla / Resumen"
        description: string;
        benefits: string[]; // List of strings
        useCases?: string; // Simple text description
    };

    // Tab 2: Detalle del producto y sus funcionalidades
    functionalDetail?: {
        stages: string[]; // List of stage descriptions
        usageConditions: string;
    };

    // Tab 3: Información Complementaria
    complementaryInfo: {
        additionalDocs: { title: string; link: string }[];
        images: string[]; // URLs or file names
    };
}

export interface UseCase {
    id: string;
    title: string;
    description: string;

    // ¿Cómo funciona?
    businessStages: Stage[];
    technicalSteps: string[];

    // Condiciones
    usageConditions: string;
    practicalUses: string;
}

export interface Stage {
    title: string;
    description: string;
}

export interface StatusOption {
    value: string;
    label: string;
    description: string;
}

export interface ProducerTeamOption {
    value: string;
    label: string;
}