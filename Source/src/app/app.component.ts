import { Component, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';

import { Router } from '@angular/router';

interface anchor {
  name: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'Evan';

  constructor (protected router: Router) {}

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
  activeSection = 'home';
  scrollProgress = 0;

  private readonly sectionColors: Record<string, string> = {
    home:       '94,234,212',
    about:      '96,165,250',
    career:     '167,139,250',
    papers:     '251,191,36',
    projects:   '52,211,153',
    coursework: '248,113,113',
  };

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            const c = this.sectionColors[this.activeSection];
            if (c) document.documentElement.style.setProperty('--cursor-rgb', c);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ['home', 'about', 'career', 'papers', 'projects', 'coursework'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Aurora background canvas — 4 slowly drifting colored blobs
    const bgCanvas = document.getElementById('bgCanvas') as HTMLCanvasElement;
    if (bgCanvas) {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
      const bgCtx = bgCanvas.getContext('2d')!;
      const blobs = [
        { x: window.innerWidth * 0.2,  y: window.innerHeight * 0.3, vx: 0.20, vy: 0.13, r: 520, color: [94, 234, 212] },
        { x: window.innerWidth * 0.72, y: window.innerHeight * 0.2, vx: -0.14, vy: 0.17, r: 440, color: [96, 165, 250] },
        { x: window.innerWidth * 0.5,  y: window.innerHeight * 0.75, vx: 0.11, vy: -0.20, r: 480, color: [167, 139, 250] },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.55, vx: -0.17, vy: -0.11, r: 400, color: [52, 211, 153] },
      ];
      window.addEventListener('resize', () => {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
      }, { passive: true });
      const animateBg = () => {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        for (const b of blobs) {
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -b.r || b.x > bgCanvas.width  + b.r) b.vx *= -1;
          if (b.y < -b.r || b.y > bgCanvas.height + b.r) b.vy *= -1;
          const g = bgCtx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, `rgba(${b.color.join(',')},0.065)`);
          g.addColorStop(1, `rgba(${b.color.join(',')},0)`);
          bgCtx.beginPath();
          bgCtx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          bgCtx.fillStyle = g;
          bgCtx.fill();
        }
        requestAnimationFrame(animateBg);
      };
      animateBg();
    }

    // Custom cursor — direct DOM manipulation to bypass change detection
    const dot = document.querySelector('.cursor-dot') as HTMLElement;
    const ring = document.querySelector('.cursor-ring') as HTMLElement;
    if (dot && ring) {
      document.addEventListener('mousemove', (e: MouseEvent) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      }, { passive: true });

      document.addEventListener('mousedown', () => ring.classList.add('click'));
      document.addEventListener('mouseup', () => ring.classList.remove('click'));
      document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
      document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

      // Cursor expand on interactive elements
      document.addEventListener('mouseover', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = !!target.closest('a, button, [class*="card"], .toggle-button, .scroll-top, .focus-tag, .skill-pill');
        ring.classList.toggle('hover', isInteractive);
      }, { passive: true });
    }

    // Lagging mouse glow — desktop only
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isDesktop) {
      const glow = document.getElementById('mouseGlow') as HTMLElement;
      if (glow) {
        let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
        let targetX = glowX, targetY = glowY;
        document.addEventListener('mousemove', (e: MouseEvent) => {
          targetX = e.clientX; targetY = e.clientY;
        }, { passive: true });
        const animateGlow = () => {
          glowX += (targetX - glowX) * 0.065;
          glowY += (targetY - glowY) * 0.065;
          glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
          requestAnimationFrame(animateGlow);
        };
        animateGlow();
      }
    }

    // Mouse trail — desktop only
    if (isDesktop) {
      let lastTrail = 0;
      document.addEventListener('mousemove', (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastTrail < 40) return;
        lastTrail = now;
        const trail = document.createElement('span');
        trail.className = 'cursor-trail';
        trail.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 700);
      }, { passive: true });
    }

    // Global click ripple
    document.addEventListener('click', (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;animation-delay:${i * 110}ms`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 900 + i * 110);
      }
    });

    // Preloader exit
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('exit');
        setTimeout(() => preloader.remove(), 800);
      }
    }, 1900);

    // Text scramble on section headings
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    const scramble = (el: HTMLElement) => {
      const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE) as Text;
      if (!textNode) return;
      const orig = textNode.textContent || '';
      let frame = 0;
      const total = orig.length * 3;
      const id = setInterval(() => {
        textNode.textContent = orig.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < frame / 3) return ch;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        frame++;
        if (frame > total) { textNode.textContent = orig; clearInterval(id); }
      }, 32);
    };
    const headingObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => scramble(e.target as HTMLElement), 80);
          headingObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('#about h1, #career h1, #papers h1, #projects h1, #coursework h1')
      .forEach(el => headingObs.observe(el));

    // Nav name scramble on hover
    const nameHeader = document.querySelector('.name-header') as HTMLElement;
    if (nameHeader) {
      const origName = nameHeader.textContent || '';
      let scramId: any;
      nameHeader.addEventListener('mouseenter', () => {
        clearInterval(scramId);
        let frame = 0;
        const total = origName.length * 3;
        scramId = setInterval(() => {
          nameHeader.textContent = origName.split('').map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < frame / 3) return ch;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }).join('');
          frame++;
          if (frame > total) { nameHeader.textContent = origName; clearInterval(scramId); }
        }, 32);
      });
    }

    // Magnetic nav links
    document.querySelectorAll('.nav-header a').forEach(link => {
      const el = link as HTMLElement;
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.32;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.32;
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.transition = 'transform 0.08s ease';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.isBarHidden = scrollTop > this.lastScrollTop && scrollTop > 80;
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
      }, 100);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get sectionLabel(): string {
    const idx = this.anchors.findIndex(a => a.name === this.activeSection);
    return `${String(idx + 1).padStart(2, '0')} / ${String(this.anchors.length).padStart(2, '0')}`;
  }
}