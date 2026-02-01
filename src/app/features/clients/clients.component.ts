import {
  Component,
  ViewChild,
  AfterViewInit,
  inject,
  signal,
  effect,
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
import { ClientsService } from '../../core/services/clients.service';
import { Client } from '../../core/models/client.model';

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
  private clientsService = inject(ClientsService);

  constructor() {
    // Inicializar DataSource vacío, los datos vendrán del efecto
    this.dataSource = new MatTableDataSource<Client>([]);

    // Effect para mantener la tabla sincronizada con el Signal del servicio
    effect(() => {
      const clients = this.clientsService.clients();
      this.dataSource.data = clients;

      // Si la tabla ya se inicializó, refrescamos paginador si es necesario
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
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

  openLeadDetails(client: Client) { // Renombrado a openClientDetails en el template también si es necesario, pero mantengo el nombre del método openLeadDetails si es usado o openClientDetails
    this.openClientDetails(client);
  }

  openClientDetails(client: Client) {
    console.log('Open client dialog:', client);
    const dialogRef = this.dialog.open(ClientDrawerComponent, {
      width: '80%',    // 80% of screen width
      maxWidth: '800px',
      height: '80vh',  // 80% of screen height
      maxHeight: '90vh',
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
      width: '80%',
      maxWidth: '600px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'premium-modal-panel'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Usamos el servicio para agregar
        this.clientsService.addClient({
          name: `${result.firstName} ${result.lastName}`,
          email: result.email,
          phone: result.phone,
          type: result.type,
        });
      }
    });
  }

  openUpdateClient(client: Client) {
    const dialogRef = this.dialog.open(ClientUpdateDialogComponent, {
      width: '80%',    // Consistent 80% width
      maxWidth: '800px',
      height: '80vh',  // Consistent 80% height for floating effect
      maxHeight: '90vh',
      panelClass: 'premium-modal-panel',
      disableClose: true,
      autoFocus: false,
      data: client,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Simulación update
        console.log('Cliente actualizado (Simulado):', result);
        this.clientsService.updateClient({ ...client, ...result });
      }
    });
  }
}

