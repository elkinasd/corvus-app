import { Component, inject, ViewChild, signal, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { map, filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, MatSidenavModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  isSidenavOpened = signal(true);

  constructor() {
    effect(() => {
      if (this.isMobile()) {
        this.isSidenavOpened.set(false);
      } else {
        this.isSidenavOpened.set(false);
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile()) {
          this.isSidenavOpened.set(false);
        }
      });
  }

  toggleSidenav() {
    this.isSidenavOpened.update((value) => !value);
  }
}
