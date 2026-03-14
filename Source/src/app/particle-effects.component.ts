import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from './theme.service';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  element: HTMLElement;
}

@Component({
  selector: 'app-particle-effects',
  template: `
    <div #particleContainer class="particle-container"></div>
  `,
  styles: [`
    .particle-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .particle.float {
      animation: float 20s infinite linear;
    }

    .particle.twinkle {
      animation: twinkle 3s infinite ease-in-out;
    }

    @keyframes float {
      0% {
        transform: translateY(100vh) rotate(0deg);
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
      }
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.2); }
    }

    /* Reduce particle effects on mobile for performance */
    @media (max-width: 768px) {
      .particle-container {
        display: none;
      }
    }
  `]
})
export class ParticleEffectsComponent implements OnInit, OnDestroy {
  @ViewChild('particleContainer', { static: true }) container!: ElementRef;

  private particles: Particle[] = [];
  private animationFrame: number = 0;
  private maxParticles = 50;
  private themeSubscription: any;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.createParticles();
    this.animateParticles();

    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.updateParticleColors(theme);
    });
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    this.clearParticles();
  }

  private createParticles(): void {
    for (let i = 0; i < this.maxParticles; i++) {
      this.createParticle();
    }
  }

  private createParticle(): void {
    const container = this.container.nativeElement;
    const particle = document.createElement('div');
    particle.className = 'particle';

    const isDark = this.themeService.currentThemeValue === 'dark';
    const colors = isDark
      ? ['rgba(14, 165, 233, 0.1)', 'rgba(34, 197, 94, 0.1)', 'rgba(251, 146, 60, 0.1)', 'rgba(168, 85, 247, 0.1)']
      : ['rgba(14, 165, 233, 0.05)', 'rgba(34, 197, 94, 0.05)', 'rgba(251, 146, 60, 0.05)', 'rgba(168, 85, 247, 0.05)'];

    const particleObj: Particle = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      element: particle
    };

    // Style the particle
    particle.style.width = particleObj.size + 'px';
    particle.style.height = particleObj.size + 'px';
    particle.style.backgroundColor = particleObj.color;
    particle.style.opacity = particleObj.opacity.toString();
    particle.style.left = particleObj.x + 'px';
    particle.style.top = particleObj.y + 'px';

    // Add animation classes randomly
    if (Math.random() > 0.7) {
      particle.classList.add('float');
    } else if (Math.random() > 0.4) {
      particle.classList.add('twinkle');
    }

    container.appendChild(particle);
    this.particles.push(particleObj);
  }

  private animateParticles = (): void => {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.y > window.innerHeight) particle.y = 0;
      if (particle.y < 0) particle.y = window.innerHeight;

      // Update element position
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
    });

    this.animationFrame = requestAnimationFrame(this.animateParticles);
  };

  private updateParticleColors(theme: 'dark' | 'light'): void {
    const colors = theme === 'dark'
      ? ['rgba(14, 165, 233, 0.1)', 'rgba(34, 197, 94, 0.1)', 'rgba(251, 146, 60, 0.1)', 'rgba(168, 85, 247, 0.1)']
      : ['rgba(14, 165, 233, 0.05)', 'rgba(34, 197, 94, 0.05)', 'rgba(251, 146, 60, 0.05)', 'rgba(168, 85, 247, 0.05)'];

    this.particles.forEach(particle => {
      particle.color = colors[Math.floor(Math.random() * colors.length)];
      particle.element.style.backgroundColor = particle.color;
    });
  }

  private clearParticles(): void {
    const container = this.container.nativeElement;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    this.particles = [];
  }
}