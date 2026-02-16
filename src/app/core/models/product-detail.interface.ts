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
  };

  // Tab 2: Casos de uso
  useCases: UseCase[];

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
