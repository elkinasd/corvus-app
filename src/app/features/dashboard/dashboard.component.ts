import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  DashboardKpi,
  ProjectProgress,
} from '../../core/models/dashboard-metrics.interface';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    DecimalPipe,
    BaseChartDirective,
  ],
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
      suffix: '%',
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
      prefix: '$',
    },
    {
      label: 'Flujo de Caja',
      value: 1240000,
      trend: 8,
      icon: 'account_balance',
      color: '#818cf8',
      prefix: '$',
    },
  ];

  // --- CHART CONFIG (Pipeline Funnel) ---
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#e2e8f0', font: { family: 'Inter', size: 12 } }, // Color claro para fondo oscuro
      },
      y: { display: false },
    },
  };

  public chartData: any = {
    labels: [
      'Nuevos',
      'Contactados',
      'Visita',
      'Cotización',
      'Opcionado',
      'Cierre',
    ],
    datasets: [
      {
        data: [12, 8, 5, 4, 2, 1], // Cantidad de Leads
        backgroundColor: [
          '#3b82f6', // New (Blue)
          '#f59e0b', // Contacted (Amber)
          '#8b5cf6', // Visit (Violet)
          '#ec4899', // Proposal (Pink)
          '#10b981', // Option (Emerald)
          '#ef4444', // Negotation (Red)
        ],
        borderRadius: 6,
        barThickness: 32,
      },
    ],
  };

  // --- UPCOMING ACTIVITIES ---
  upcomingActivities = [
    {
      id: 1,
      type: 'call',
      title: 'Llamar a Jorge Perez',
      time: '10:00 AM',
      description: 'Seguimiento cotización Torre A',
    },
    {
      id: 2,
      type: 'visit',
      title: 'Visita Showroom',
      time: '02:30 PM',
      description: 'Cliente: María Gonzalez',
    },
    {
      id: 3,
      type: 'email',
      title: 'Enviar Contrato',
      time: '04:00 PM',
      description: 'Para firma digital: Proyecto Norte',
    },
  ];

  projects: ProjectProgress[] = [
    { id: 1, name: 'Torre Mirador - Fase 1', progress: 85, status: 'on-track' },
    { id: 2, name: 'Residencial Corvus II', progress: 42, status: 'at-risk' },
    {
      id: 3,
      name: 'Centro Empresarial Norte',
      progress: 15,
      status: 'on-track',
    },
  ];

  recentLeads = [
    { id: 1, name: 'Juan Perez', date: 'Hace 2h', source: 'Instagram Ad' },
    { id: 2, name: 'Maria Garcia', date: 'Hace 5h', source: 'Referido' },
    { id: 3, name: 'Constructora S.A.', date: 'Ayer', source: 'Web' },
  ];
}
