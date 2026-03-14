import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appExplode]'
})
export class ExplodeDirective implements OnInit, OnDestroy {
  private particles: any[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;
  private animationFrameId: number = 0;
  private isHovered = false;
  
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.position = 'relative';
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '-50px';
    this.canvas.style.left = '-50px';
    this.canvas.style.width = 'calc(100% + 100px)';
    this.canvas.style.height = 'calc(100% + 100px)';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '999';
    
    this.el.nativeElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
  }

  private resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.canvas.width = rect.width + 100;
    this.canvas.height = rect.height + 100;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isHovered) return;
    this.isHovered = true;
    
    this.resizeCanvas();
    this.createParticles();
    this.animate();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

  private createParticles() {
    this.particles = [];
    const colors = ['#7c3aed', '#3b82f6', '#10b981', '#ff0055', '#00ffff'];
    
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.02
      });
    }
  }

  private animate = () => {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    let activeParticles = false;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.life <= 0) continue;
      
      activeParticles = true;
      p.life -= p.decay;
      p.x += p.vx;
      p.y += p.vy;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fill();
    }
    
    if (activeParticles) {
      this.animationFrameId = requestAnimationFrame(this.animate);
    } else if (this.isHovered) {
      // Loop if still hovered
      this.createParticles();
      this.animationFrameId = requestAnimationFrame(this.animate);
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
