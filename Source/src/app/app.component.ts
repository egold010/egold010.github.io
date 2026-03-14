import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

interface Anchor {
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Evan Goldman';
  isDarkMode = true;

  constructor(
    protected router: Router, 
    private viewportScroller: ViewportScroller,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  anchors: Anchor[] = [
    { name: "home", active: false },
    { name: "about", active: false },
    { name: "career", active: false },
    { name: "papers", active: false },
    { name: "projects", active: false },
    { name: "coursework", active: false },
  ]

  lastScrollTop = 0;
  isBarHidden = false;
  isMenuOpen = false;

  ngOnInit() {
    this.setupScrollSpy();
    this.setupRouterEvents();
    this.loadThemePreference();
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.toggleTheme(false);
    }
  }

  toggleTheme(updateStorage: boolean = true) {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.renderer.removeClass(document.body, 'light-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.addClass(document.body, 'light-mode');
    }
    
    if (updateStorage) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private setupRouterEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => this.updateActiveSection(), 100);
    });
  }

  private setupScrollSpy() {
    window.addEventListener('scroll', () => this.updateActiveSection(), { passive: true });
  }

  private updateActiveSection() {
    const scrollPosition = window.scrollY + 100;
    const sections = this.anchors.map(anchor => {
      const element = document.getElementById(anchor.name);
      return {
        name: anchor.name,
        top: element?.offsetTop || 0,
        bottom: (element?.offsetTop || 0) + (element?.offsetHeight || 0)
      };
    });

    // Reset all anchors
    this.anchors.forEach(anchor => anchor.active = false);

    // Find the active section
    const activeSection = sections.find(section => 
      scrollPosition >= section.top && scrollPosition < section.bottom
    );

    if (activeSection) {
      const anchor = this.anchors.find(a => a.name === activeSection.name);
      if (anchor) {
        anchor.active = true;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isBarHidden = scrollTop > this.lastScrollTop && scrollTop > 100;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    this.isMenuOpen = false;
    this.updateActiveSection();
  }

  scrollToSection(id: string) {
    this.isMenuOpen = false;
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}