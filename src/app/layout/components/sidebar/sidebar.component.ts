import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Leads', route: '/leads', icon: 'people' },
    { label: 'Clientes', route: '/clients', icon: 'hub' },
    { label: 'Ventas', route: '/sales', icon: 'shopping_cart' },
    { label: 'Proyectos', route: '/projects', icon: 'architecture' },
    { label: 'Presupuestos', route: '/budgets', icon: 'payments' },
    { label: 'Inventario', route: '/inventory', icon: 'inventory_2' },
    { label: 'Tesorería', route: '/treasury', icon: 'account_balance' },
  ];
}
