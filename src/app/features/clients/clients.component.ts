import {
  Component,
  ViewChild,
  AfterViewInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientDialogComponent } from './components/client-dialog/client-dialog.component';
import { ClientDrawerComponent } from './components/client-drawer/client-drawer.component';
import { ClientUpdateDialogComponent } from './components/client-update-dialog/client-update-dialog.component';

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
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
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
    'actions',
  ];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedClient = signal<Client | null>(null);

  private dialog = inject(MatDialog);

  constructor() {
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
      {
        id: '6',
        name: 'Pedro Pablo',
        email: 'pedro.pablo@gmail.com',
        phone: '+57 311 111 2222',
        type: 'Prospecto',
        status: 'Activo',
        lastActivity: '2026-01-02',
      },
      {
        id: '7',
        name: 'Sofia Vergara',
        email: 'sofia.v@hollywood.com',
        phone: '+1 555 666 7777',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2026-01-03',
      },
      {
        id: '8',
        name: 'Mario Bros',
        email: 'mario@nintendo.com',
        phone: '+81 90 1234 5678',
        type: 'Comprador',
        status: 'Activo',
        lastActivity: '2025-10-10',
      },
      {
        id: '9',
        name: 'Luigi Bros',
        email: 'luigi@nintendo.com',
        phone: '+81 90 8765 4321',
        type: 'Prospecto',
        status: 'Inactivo',
        lastActivity: '2025-09-09',
      },
      {
        id: '10',
        name: 'Peach Toledo',
        email: 'peach@castle.com',
        phone: '+81 90 1111 2222',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2025-12-25',
      },
      {
        id: '11',
        name: 'Bowser Koopa',
        email: 'bowser@darklands.com',
        phone: '+81 90 6666 9999',
        type: 'Comprador',
        status: 'Activo',
        lastActivity: '2026-01-01',
      },
      {
        id: '12',
        name: 'Toad Honguito',
        email: 'toad@mushroom.com',
        phone: '+81 90 7777 8888',
        type: 'Prospecto',
        status: 'Activo',
        lastActivity: '2025-11-20',
      },
      {
        id: '13',
        name: 'Yoshi Dinosaurio',
        email: 'yoshi@island.com',
        phone: '+81 90 5555 4444',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2025-12-12',
      },
      {
        id: '14',
        name: 'Wario Malo',
        email: 'wario@gold.com',
        phone: '+81 90 3333 2222',
        type: 'Comprador',
        status: 'Inactivo',
        lastActivity: '2025-08-15',
      },
      {
        id: '15',
        name: 'Waluigi Flaco',
        email: 'waluigi@tennis.com',
        phone: '+81 90 9999 0000',
        type: 'Prospecto',
        status: 'Activo',
        lastActivity: '2025-07-20',
      },
      {
        id: '16',
        name: 'Donkey Kong',
        email: 'dk@jungle.com',
        phone: '+1 555 888 9999',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2026-01-04',
      },
      {
        id: '17',
        name: 'Diddy Kong',
        email: 'diddy@jungle.com',
        phone: '+1 555 222 3333',
        type: 'Comprador',
        status: 'Activo',
        lastActivity: '2025-12-29',
      },
      {
        id: '18',
        name: 'Zelda Hyrule',
        email: 'zelda@hyrule.com',
        phone: '+81 90 4444 5555',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2025-12-24',
      },
      {
        id: '19',
        name: 'Link Heroe',
        email: 'link@hyrule.com',
        phone: '+81 90 1212 3434',
        type: 'Comprador',
        status: 'Activo',
        lastActivity: '2026-01-01',
      },
      {
        id: '20',
        name: 'Ganondorf Gerudo',
        email: 'ganon@dark.com',
        phone: '+81 90 6666 6666',
        type: 'Prospecto',
        status: 'Inactivo',
        lastActivity: '2025-06-06',
      },
      {
        id: '21',
        name: 'Samus Aran',
        email: 'samus@metroid.com',
        phone: '+1 555 000 1111',
        type: 'Inversionista',
        status: 'VIP',
        lastActivity: '2025-12-31',
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
    console.log('Open client dialog:', client);
    const dialogRef = this.dialog.open(ClientDrawerComponent, {
      width: '600px',
      maxWidth: '90vw',
      panelClass: 'premium-modal-panel',
      data: client,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edit') {
        this.openUpdateClient(client);
      }
    });
  }

  openNewClient() {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuevo cliente creado:', result);
        const newClient: Client = {
          id: Math.random().toString(36).substr(2, 9), 
          name: `${result.firstName} ${result.lastName}`,
          email: result.email,
          phone: result.phone,
          type: result.type as any,
          status: 'Activo',
          lastActivity: new Date().toISOString(),
        };

        const currentData = this.dataSource.data;
        this.dataSource.data = [newClient, ...currentData]; 
      }
    });
  }

  openUpdateClient(client: Client) {
    const dialogRef = this.dialog.open(ClientUpdateDialogComponent, {
      width: '800px', 
      maxWidth: '95vw',
      height: '90vh', 
      panelClass: 'premium-modal-panel', 
      disableClose: true, 
      autoFocus: false,
      data: client, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('CLIENTE VINCULADO:', result);
      }
    });
  }
}
