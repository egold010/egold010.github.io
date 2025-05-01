import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

interface anchor {
  name: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Evan Goldman';

  constructor (protected router: Router, private viewportScroller: ViewportScroller) {}

  anchors: anchor[] = [
    { name: "home" },
    { name: "about" },
    { name: "career" },
    { name: "papers" },
    { name: "projects" },
    { name: "coursework" },
  ]

  lastScrollTop = 0;
  isBarHidden = false;
  isMenuOpen = false;

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