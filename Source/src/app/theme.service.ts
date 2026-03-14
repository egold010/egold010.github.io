import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private currentTheme = new BehaviorSubject<'dark' | 'light'>('dark');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as 'dark' | 'light';
      const initialTheme = savedTheme || this.getSystemTheme();
      this.setTheme(initialTheme, false);
    }
  }

  get theme$() {
    return this.currentTheme.asObservable();
  }

  get currentThemeValue() {
    return this.currentTheme.value;
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme.value === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: 'dark' | 'light', saveToStorage = true): void {
    if (isPlatformBrowser(this.platformId)) {
      // Apply theme with transition
      document.documentElement.style.setProperty('--theme-transition', 'all 0.3s ease');
      document.documentElement.setAttribute('data-theme', theme);

      // Update body classes
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(theme);

      // Save to localStorage
      if (saveToStorage) {
        localStorage.setItem(this.THEME_KEY, theme);
      }

      // Update current theme
      this.currentTheme.next(theme);

      // Remove transition after animation completes
      setTimeout(() => {
        document.documentElement.style.removeProperty('--theme-transition');
      }, 300);
    }
  }

  private getSystemTheme(): 'dark' | 'light' {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }

  initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = this.currentTheme.value;
      document.documentElement.setAttribute('data-theme', theme);
      document.body.classList.add(theme);
    }
  }
}