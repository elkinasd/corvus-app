import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// === MODELOS DE DATOS (El "Core" del Negocio) ===

export type ProjectType = 'VIS' | 'NO-VIS' | 'VIP';
export type UnitStatus = 'available' | 'reserved' | 'sold' | 'blocked';
export type UnitType = 'apartment' | 'parking_private' | 'parking_visitor' | 'storage';

export interface RoomSpec {
    name: string; // "Alcoba Ppal"
    dim?: string; // "3.05 x 2.65m"
}

export interface UnitModel {
    name: string; // "Tipo 1A"
    areaTotal: number;
    areaPrivate: number;
    distribution: RoomSpec[]; // ["Alcoba Ppal", "Estudio", "Balcón"]
    orientation?: string; // "Suroccidente"
}

export interface Unit {
    id: string;
    type: UnitType;
    number: string; // Ej: "502", "P-10"
    model: UnitModel; // Ahora es un objeto rico, no un string
    floor: number;  // Para ordenamiento visual
    price: number;
    status: UnitStatus;
    towerId: string;

    // Relaciones (El CRM Power)
    relatedUnitId?: string; // Ej: El apto tiene el garaje x
    leadId?: string;        // Quién lo separó (si aplica)
}

export interface Tower {
    id: string;
    name: string; // "Torre 1"
    floors: number;
    unitsPerFloor: number;
    units: Unit[]; // Los apartamentos de esta torre
}

export interface ProjectDefinition {
    id: string;
    name: string;
    description: string; // Para el "Brochure"
    type: ProjectType;
    city: string;
    address: string;

    // Specs generales para resumen
    specs: {
        totalUnits: number;
        totalParking: { private: number; visitors: number };
        totalStorage: number; // Cuartos útiles
    };

    towers: Tower[];
}

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    // MOCK DATA: "Altos de Corvus"

    // Definición de Tipologías (Basado en la imagen que subiste)
    private models: Record<string, UnitModel> = {
        'TIPO 1': {
            name: 'Tipo 1',
            areaTotal: 52.00,
            areaPrivate: 46.46,
            distribution: [
                { name: 'Alcoba Ppal', dim: '3.05 x 2.65m' },
                { name: 'Alcoba 2', dim: '2.10 x 2.22m' },
                { name: 'Alcoba 3' },
                { name: 'Home Office / Estudio' },
                { name: 'Cocina Abierta' },
                { name: 'Balcón', dim: '2.30 x 0.90m' }
            ],
            orientation: 'Nororiente'
        },
        'TIPO 2': {
            name: 'Tipo 2',
            areaTotal: 52.00,
            areaPrivate: 46.46,
            distribution: [
                { name: 'Alcoba Ppal' },
                { name: 'Alcoba 2' },
                { name: 'Estudio Ampliado' },
                { name: 'Cocina' },
                { name: '2 Baños Completos' }
            ],
            orientation: 'Suroccidente'
        }
    };

    // MOCK DATA: Lista de Proyectos
    private mockProjects: ProjectDefinition[] = [
        {
            id: 'p-001',
            name: 'Altos de Corvus',
            description: 'Proyecto VIS con acabados premium en zona de alta valorización.',
            type: 'VIS',
            city: 'Medellín',
            address: 'Calle 10 # 20-30',
            specs: {
                totalUnits: 40,
                totalParking: { private: 20, visitors: 5 },
                totalStorage: 10
            },
            towers: [
                { id: 't-1', name: 'Torre A', floors: 5, unitsPerFloor: 4, units: [] },
                { id: 't-2', name: 'Torre B', floors: 5, unitsPerFloor: 4, units: [] }
            ]
        },
        {
            id: 'p-002',
            name: 'Bajos de Corvus',
            description: 'Vivienda campestre a las afueras de la ciudad.',
            type: 'NO-VIS',
            city: 'Rionegro',
            address: 'Vereda La Laja',
            specs: {
                totalUnits: 20,
                totalParking: { private: 20, visitors: 10 },
                totalStorage: 20
            },
            towers: [
                { id: 't-3', name: 'Torre Única', floors: 4, unitsPerFloor: 5, units: [] }
            ]
        }
    ];

    private projectSubject = new BehaviorSubject<ProjectDefinition | null>(null);
    project$ = this.projectSubject.asObservable();

    constructor() {
        this.seedDemoData();
        // Seleccionar el primero por defecto para no romper nada mientras tanto
        // this.selectProject('p-001'); 
    }

    getProjects(): ProjectDefinition[] {
        return this.mockProjects;
    }

    selectProject(projectId: string) {
        const p = this.mockProjects.find(x => x.id === projectId);
        if (p) this.projectSubject.next(p);
    }

    // Generador de Datos de Prueba (Para no meter 40 aptos a mano)
    private seedDemoData() {
        // Generar datos para TODOS los proyectos mock
        this.mockProjects.forEach(project => {
            project.towers.forEach(tower => {
                const units: Unit[] = [];

                for (let f = 1; f <= tower.floors; f++) {
                    for (let u = 1; u <= tower.unitsPerFloor; u++) {
                        const basePrice = 150_000_000;
                        const floorPremium = (f - 1) * 2_000_000;

                        let status: UnitStatus = 'available';
                        const rand = Math.random();
                        if (rand > 0.8) status = 'sold';
                        else if (rand > 0.6) status = 'reserved';

                        // Alternar tipos
                        const isType1 = u <= 2;
                        const modelData = isType1 ? this.models['TIPO 1'] : this.models['TIPO 2'];

                        units.push({
                            id: `${tower.id}-${f}0${u}`,
                            type: 'apartment',
                            number: `${f}0${u}`,
                            model: modelData,
                            floor: f,
                            price: basePrice + floorPremium,
                            status: status,
                            towerId: tower.id
                        });
                    }
                }
                tower.units = units;
            });
        });

        // Iniciar con null o el primero
        // this.projectSubject.next(this.mockProjects[0]);
    }

    // API Methods (Simulados)
    getProjectById(projectId: string): ProjectDefinition | undefined {
        return this.mockProjects.find(p => p.id === projectId);
    }

    getUnitById(unitId: string): Unit | undefined {
        for (const project of this.mockProjects) {
            for (const tower of project.towers) {
                const unit = tower.units.find(u => u.id === unitId);
                if (unit) return unit;
            }
        }
        return undefined;
    }

    updateUnitStatus(unitId: string, status: UnitStatus) {
        // Buscar la unidad y actualizarla
        for (const project of this.mockProjects) {
            for (const tower of project.towers) {
                const unit = tower.units.find(u => u.id === unitId);
                if (unit) {
                    unit.status = status;
                    // Si el proyecto actualizado es el actual, emitir el cambio
                    if (this.projectSubject.value?.id === project.id) {
                        this.projectSubject.next({ ...project });
                    }
                    return;
                }
            }
        }
    }
}
