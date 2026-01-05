import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'corvus-theme-preference';

  // Using Signals for modern Angular reactivity
  public currentTheme = signal<Theme>('dark');

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.initTheme();
    }

    // Effect to update DOM when signal changes
    effect(() => {
      const theme = this.currentTheme();
      if (this.isBrowser) {
        this.applyTheme(theme);
        localStorage.setItem(this.THEME_KEY, theme);
      }
    });
  }

  toggleTheme() {
    this.currentTheme.update((current) =>
      current === 'dark' ? 'light' : 'dark'
    );
  }

  private initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      // Default to dark as per Kanto Premium
      this.currentTheme.set('dark');
    }
  }

  private applyTheme(theme: Theme) {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light-theme');
      body.setAttribute('data-theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.setAttribute('data-theme', 'dark');
    }
  }
}
