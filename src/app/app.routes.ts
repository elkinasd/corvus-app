import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  // 1. Redirección Inicial: Aterriza en Login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  // 2. Rutas de Autenticación (Publicas)
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },

  // 3. Rutas de la Aplicación (Protegidas / Dashboard)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'leads',
        loadComponent: () =>
          import('./features/leads/leads.component').then(
            (m) => m.LeadsComponent
          ),
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/projects/components/project-list/project-list.component').then(m => m.ProjectListComponent)
          },
          {
            path: 'new',
            title: 'Nuevo Proyecto',
            loadComponent: () => import('./features/projects/components/project-wizard/project-wizard.component').then(m => m.ProjectWizardComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('./features/projects/pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
          }
        ]
      },
      // { // Ventas movido a Proyectos
      //   path: 'sales/:id', 
      //   loadComponent: () => import('./features/sales/sales.component').then(m => m.SalesComponent)
      // },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/clients.component').then(
            (m) => m.ClientsComponent
          ),
      },
    ],
  },

  // 4. Fallback (Si no encuentra nada, al login)
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
