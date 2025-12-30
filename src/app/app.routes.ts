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
        path: 'sales',
        loadComponent: () =>
          import('./features/sales/sales.component').then(
            (m) => m.SalesComponent
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
