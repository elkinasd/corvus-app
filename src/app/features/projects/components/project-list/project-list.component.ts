import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InventoryService, ProjectDefinition } from '../../../../core/services/inventory.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  private inventoryService = inject(InventoryService);
  private router = inject(Router);

  constructor() {
    console.log('Project List Component Initialized');
  }

  projects = this.inventoryService.getProjects();

  openProject(id: string) {
    this.router.navigate(['projects', id]);
  }

  createProject() {
    this.router.navigate(['projects', 'new']);
  }
}
