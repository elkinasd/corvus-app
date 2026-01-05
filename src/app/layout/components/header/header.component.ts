import { Component, input, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showMenuButton = input(false);
  toggleMenu = output();

  constructor(public themeService: ThemeService) {}

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
