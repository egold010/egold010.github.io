import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-floating-action-button',
  template: `
    <div class="fixed bottom-6 right-6 z-40">
      <!-- Expanded Actions -->
      <div class="flex flex-col items-end space-y-3 mb-4"
           [class.opacity-0]="!isExpanded"
           [class.pointer-events-none]="!isExpanded"
           [class.opacity-100]="isExpanded"
           [class.pointer-events-auto]="isExpanded"
           style="transition: all 0.3s ease;">

        <!-- Back to Top -->
        <button (click)="scrollToTop()"
                class="fab-action group"
                aria-label="Scroll to top">
          <div class="fab-action-content">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <span class="fab-tooltip">Top</span>
          </div>
        </button>

        <!-- Theme Toggle -->
        <button (click)="toggleTheme()"
                class="fab-action group"
                [attr.aria-label]="currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
          <div class="fab-action-content">
            <svg *ngIf="currentTheme === 'dark'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg *ngIf="currentTheme === 'light'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <span class="fab-tooltip">Theme</span>
          </div>
        </button>

        <!-- Contact -->
        <button (click)="scrollToSection('contact')"
                class="fab-action group"
                aria-label="Go to contact section">
          <div class="fab-action-content">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span class="fab-tooltip">Contact</span>
          </div>
        </button>

        <!-- Projects -->
        <button (click)="scrollToSection('projects')"
                class="fab-action group"
                aria-label="Go to projects section">
          <div class="fab-action-content">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span class="fab-tooltip">Projects</span>
          </div>
        </button>
      </div>

      <!-- Main FAB Button -->
      <button (click)="toggleExpanded()"
              class="fab-main group"
              [class.rotate-45]="isExpanded"
              aria-label="Toggle floating actions">
        <svg class="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .fab-main {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0ea5e9, #0284c7);
      border: none;
      box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      z-index: 50;
    }

    .fab-main:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(14, 165, 233, 0.6);
    }

    .fab-main:active {
      transform: scale(0.95);
    }

    .fab-action {
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fab-action-content {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(31, 41, 55, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(75, 85, 99, 0.3);
      border-radius: 50px;
      padding: 8px 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      min-width: 120px;
      position: relative;
      overflow: hidden;
    }

    .fab-action-content::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .fab-action:hover .fab-action-content::before {
      opacity: 1;
    }

    .fab-tooltip {
      font-size: 14px;
      font-weight: 500;
      color: white;
      white-space: nowrap;
    }

    .fab-action:hover .fab-tooltip {
      color: #0ea5e9;
    }

    /* Show actions when expanded */
    .fab-action:nth-child(1) {
      transition-delay: 0.1s;
    }

    .fab-action:nth-child(2) {
      transition-delay: 0.15s;
    }

    .fab-action:nth-child(3) {
      transition-delay: 0.2s;
    }

    .fab-action:nth-child(4) {
      transition-delay: 0.25s;
    }
  `]
})
export class FloatingActionButtonComponent implements OnInit {
  isExpanded = false;
  currentTheme: 'dark' | 'light' = 'dark';
  showScrollToTop = false;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // Close FAB when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('app-floating-action-button')) {
        this.isExpanded = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.showScrollToTop = window.scrollY > 400;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isExpanded = false;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.isExpanded = false;
  }

  scrollToSection(sectionId: string) {
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80; // Account for fixed header
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    });
    this.isExpanded = false;
  }
}