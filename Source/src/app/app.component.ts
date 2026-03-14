import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ThemeService } from './theme.service';

interface anchor {
  name: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Evan Goldman';
  currentTheme: 'dark' | 'light' = 'dark';
  private themeSubscription: Subscription = new Subscription();

  constructor(
    protected router: Router,
    private viewportScroller: ViewportScroller,
    private themeService: ThemeService
  ) {}

  anchors: anchor[] = [
    { name: "home" },
    { name: "about" },
    { name: "skills" },
    { name: "career" },
    { name: "projects" },
    { name: "github-stats" },
    { name: "testimonials" },
    { name: "contact" },
  ]

  lastScrollTop = 0;
  isBarHidden = false;
  isMenuOpen = false;

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.themeService.initializeTheme();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isBarHidden = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    this.isMenuOpen = false;
  }

  scrollToSection(id: string) {
    this.isMenuOpen = false;
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Delay ensures content is rendered first
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}