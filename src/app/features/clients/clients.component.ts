import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Inversionista' | 'Comprador' | 'Prospecto';
  status: 'Activo' | 'Inactivo' | 'VIP';
  lastActivity: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'type',
    'status',
    'lastActivity',
    'actions',
  ];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Mock Data
    const clients: Client[] = [
      {
        id: '1',
        name: 'Juan Perez',
        email: 'juan.perez@gmail.com',
        phone: '+57 300 123 4567',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2025-12-28',
      },
      {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.g@outlook.com',
        phone: '+57 310 987 6543',
        type: 'Comprador',
        status: 'Activo',
        lastActivity: '2025-11-15',
      },
      {
        id: '3',
        name: 'Carlos Rodriguez',
        email: 'crodriguez@empresa.com',
        phone: '+57 315 555 1122',
        type: 'Prospecto',
        status: 'Activo',
        lastActivity: '2025-12-30',
      },
      {
        id: '4',
        name: 'Ana Martinez',
        email: 'ana.martinez@yahoo.com',
        phone: '+57 320 444 8899',
        type: 'Comprador',
        status: 'Inactivo',
        lastActivity: '2024-08-10',
      },
      {
        id: '5',
        name: 'Luisa Fernanda',
        email: 'luisa.fer@gmail.com',
        phone: '+57 300 222 3344',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2025-12-01',
      },
    ];

    this.dataSource = new MatTableDataSource(clients);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openClientDetails(client: Client) {
    console.log('Open client:', client);
    // TODO: Implementar Drawer de Cliente
  }
}
