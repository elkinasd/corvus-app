import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardKpi, ProjectProgress } from '../../core/models/dashboard-metrics.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  kpis: DashboardKpi[] = [
    {
      label: 'Avance Físico Obra',
      value: 68.5,
      trend: 2.4,
      icon: 'architecture',
      color: '#38bdf8',
      suffix: '%'
    },
    {
      label: 'Leads Activos',
      value: 124,
      trend: 12,
      icon: 'people',
      color: '#fbbf24',
    },
    {
      label: 'Ventas del Mes',
      value: 850000,
      trend: -5,
      icon: 'shopping_cart',
      color: '#22c55e',
      prefix: '$'
    },
    {
      label: 'Flujo de Caja',
      value: 1240000,
      trend: 8,
      icon: 'account_balance',
      color: '#818cf8',
      prefix: '$'
    }
  ];

  projects: ProjectProgress[] = [
    { id: 1, name: 'Torre Mirador - Fase 1', progress: 85, status: 'on-track' },
    { id: 2, name: 'Residencial Corvus II', progress: 42, status: 'at-risk' },
    { id: 3, name: 'Centro Empresarial Norte', progress: 15, status: 'on-track' },
  ];

  recentLeads = [
    { id: 1, name: 'Juan Perez', date: 'Hace 2h', source: 'Instagram Ad' },
    { id: 2, name: 'Maria Garcia', date: 'Hace 5h', source: 'Referido' },
    { id: 3, name: 'Constructora S.A.', date: 'Ayer', source: 'Web' },
  ];
}
