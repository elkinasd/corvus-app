import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Unit } from '../../../../core/services/inventory.service';

@Component({
    selector: 'app-unit-drawer',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './unit-drawer.component.html',
    styleUrl: './unit-drawer.component.scss'
})
export class UnitDrawerComponent {
    @Input({ required: true }) unit!: Unit;
    @Output() close = new EventEmitter<void>();

    getStatusClass(status: string): string {
        switch (status) {
            case 'available': return 'bg-success-subtle';
            case 'reserved': return 'bg-warning-subtle';
            case 'sold': return 'bg-danger-subtle';
            default: return 'bg-secondary';
        }
    }
}
