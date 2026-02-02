import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { InventoryService, ProjectDefinition, Tower, Unit, UnitModel } from '../../../../core/services/inventory.service';

@Component({
  selector: 'app-project-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
  templateUrl: './project-wizard.component.html',
  styleUrl: './project-wizard.component.scss'
})
export class ProjectWizardComponent {
  private fb = inject(FormBuilder);
  private inventoryService = inject(InventoryService);
  private router = inject(Router);

  // State
  currentStep = 1;
  totalSteps = 3;

  // Constants
  readonly SMMLV_2024 = 1300000; // Valor ejemplo

  // Form
  projectForm = this.fb.group({
    // PASO 1: DATOS PROYECTO
    general: this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      isBigCity: [true], // true = 150 SMMLV, false = 135
      type: ['VIS', Validators.required], // VIS, NO-VIS, VIP
    }),

    // PASO 2: TIPOLOGÍAS
    models: this.fb.array([]),

    // PASO 3: ESTRUCTURA
    structure: this.fb.group({
      towersCount: [1, [Validators.required, Validators.min(1)]],
      floorsPerTower: [10, [Validators.required, Validators.min(1)]],
      unitsPerFloor: [4, [Validators.required, Validators.min(1)]],
    })
  });

  // Helpers
  get generalGroup() { return this.projectForm.get('general') as FormGroup; }
  get modelsArray() { return this.projectForm.get('models') as FormArray; }
  get structureGroup() { return this.projectForm.get('structure') as FormGroup; }

  constructor() {
    console.log('Premium Wizard Loaded');
    // Inicializar con 1 modelo por defecto
    this.addModel();
  }

  // --- MODEL LOGIC ---
  addModel() {
    const isBigCity = this.generalGroup.get('isBigCity')?.value;
    const defaultPrice = isBigCity ? 150 : 135;

    const modelGroup = this.fb.group({
      name: [`Tipo ${String.fromCharCode(65 + this.modelsArray.length)}`, Validators.required], // Tipo A, B...
      areaTotal: [50, Validators.required],
      areaPrivate: [45, Validators.required],
      priceSmmlv: [defaultPrice], // Dinámico según ciudad
      priceManual: [0],  // Si es NO-VIS
    });
    this.modelsArray.push(modelGroup);
  }

  removeModel(index: number) {
    if (this.modelsArray.length > 1) {
      this.modelsArray.removeAt(index);
    }
  }

  // --- NAVIGATION ---
  nextStep() {
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  // --- GENERATION LOGIC ---
  generateProject() {
    const general = this.generalGroup.value;
    const structure = this.structureGroup.value;
    const models = this.modelsArray.value;

    // Validaciones de null check para structure
    const towersCount = structure.towersCount || 1;
    const floorsPerTower = structure.floorsPerTower || 1;
    const unitsPerFloor = structure.unitsPerFloor || 1;

    // Calcular Precio Max VIS
    const smmlvCap = general.isBigCity ? 150 : 135;
    const maxVisPrice = smmlvCap * this.SMMLV_2024;

    const projectId = 'p-' + Date.now();
    const towers: Tower[] = [];

    for (let t = 1; t <= towersCount; t++) {
      const units: Unit[] = [];
      const towerId = `t-${projectId}-${t}`;

      for (let f = 1; f <= floorsPerTower; f++) {
        for (let u = 1; u <= unitsPerFloor; u++) {
          // Asignación Cíclica de Modelos: 1->A, 2->B, 3->A...
          const modelIndex = (u - 1) % models.length;
          const selectedModel = models[modelIndex];

          // Calcular Precio
          let finalPrice = 0;
          if (general.type === 'VIS') {
            // Usar SMMLV definido en el modelo o el tope
            const caps = selectedModel.priceSmmlv || smmlvCap;
            finalPrice = caps * this.SMMLV_2024;
          } else {
            finalPrice = selectedModel.priceManual || 0;
          }

          // Piso Premium (ej: +2M por piso)
          finalPrice += (f - 1) * 2000000;

          const uNum = u.toString().padStart(2, '0');

          // Mapear al objeto UnitModel rico
          const richModel: UnitModel = {
            name: selectedModel.name,
            areaTotal: selectedModel.areaTotal,
            areaPrivate: selectedModel.areaPrivate,
            distribution: [{ name: 'Espacio Flex' }] // Default
          };

          units.push({
            id: `${towerId}-${f}${uNum}`,
            type: 'apartment',
            number: `${f}${uNum}`,
            model: richModel,
            floor: f,
            price: finalPrice,
            status: 'available',
            towerId: towerId
          });
        }
      }
      towers.push({
        id: towerId,
        name: `Torre ${t}`,
        floors: floorsPerTower,
        unitsPerFloor: unitsPerFloor,
        units
      });
    }

    const newProject: ProjectDefinition = {
      id: projectId,
      name: general.name || 'Nuevo Proyecto',
      city: general.city || '',
      address: 'Dirección Generada',
      type: (general.type as any) || 'VIS',
      description: `Proyecto ${general.type} en ${general.city}`,
      specs: {
        totalUnits: towers.reduce((a, b) => a + b.units.length, 0),
        totalParking: { private: 0, visitors: 0 },
        totalStorage: 0
      },
      towers
    };

    // Save & Redirect
    const current = this.inventoryService.getProjects();
    current.push(newProject);
    this.router.navigate(['sales', projectId]);
  }
}
