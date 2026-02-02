import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService, ProjectDefinition, Unit } from '../../../../core/services/inventory.service';
import { UnitDrawerComponent } from '../../components/unit-drawer/unit-drawer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, UnitDrawerComponent, MatButtonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  project$ = this.inventoryService.project$;
  selectedUnit: Unit | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.inventoryService.selectProject(id);
      }
    });
  }

  // Helper para clases de estado
  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'bg-success-subtle text-success border-success';
      case 'reserved': return 'bg-warning-subtle text-warning border-warning';
      case 'sold': return 'bg-danger-subtle text-danger border-danger';
      case 'blocked': return 'bg-secondary-subtle text-secondary border-secondary';
      default: return '';
    }
  }

  onUnitClick(unit: Unit) {
    this.selectedUnit = unit;
  }

  back() {
    this.router.navigate(['/projects']);
  }
}
