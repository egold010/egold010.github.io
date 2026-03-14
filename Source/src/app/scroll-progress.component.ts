import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-scroll-progress',
  template: `
    <div class="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <!-- Scroll Progress Bar -->
      <div class="h-1 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 ease-out"
           [style.width.%]="scrollProgress">
      </div>

      <!-- Section Navigation -->
      <div class="absolute top-4 right-4 flex flex-col space-y-2" *ngIf="showSectionNav">
        <button *ngFor="let section of sections; let i = index"
                (click)="scrollToSection(section.id)"
                [class.active]="activeSection === section.id"
                class="w-3 h-3 rounded-full border-2 border-primary-400/50 hover:border-primary-400 transition-all duration-300 hover:scale-125 pointer-events-auto"
                [style.background-color]="activeSection === section.id ? 'rgb(14, 165, 233)' : 'transparent'"
                [attr.aria-label]="'Scroll to ' + section.name">
        </button>
      </div>
    </div>
  `,
  styles: [`
    .active {
      background-color: rgb(14, 165, 233) !important;
      border-color: rgb(14, 165, 233) !important;
    }
  `]
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  scrollProgress: number = 0;
  showSectionNav: boolean = false;
  activeSection: string = '';

  sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'career', name: 'Career' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ];

  private scrollTimeout: any;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.updateScrollProgress();
    this.updateActiveSection();
  }

  ngOnDestroy() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollProgress();
    this.updateActiveSection();

    // Show section navigation after scrolling down
    this.showSectionNav = window.scrollY > 300;

    // Debounce for performance
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      // Additional scroll handling if needed
    }, 10);
  }

  private updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = (scrollTop / docHeight) * 100;
  }

  private updateActiveSection() {
    const scrollPosition = window.scrollY + 100; // Offset for header

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.sections[i].id);
      if (section) {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
          this.activeSection = this.sections[i].id;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
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
  }
}