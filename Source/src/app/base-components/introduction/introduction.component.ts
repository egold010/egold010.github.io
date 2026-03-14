import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
}

interface Shape {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  rotation: number; rotationSpeed: number;
  sides: number;
}

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly taglines = [
    'Robotics Engineer',
    'SLAM Researcher',
    'Computer Vision Dev',
    'ML Practitioner',
    'ROS2 Expert',
  ];
  private taglineIndex = 0;
  typedTagline = '';
  typingDone = false;
  photoX = 0;
  photoY = 0;
  heroOpacity = 1;
  photoScrollY = 0;
  textScrollY = 0;
  currentTime = '';

  private typeTimer: any;
  private clockTimer: any;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private shapes: Shape[] = [];
  private bursts: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; }[] = [];
  private animFrameId = 0;
  private mouseX = 0;
  private mouseY = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.typeNext(), 1800);
    const tick = () => this.currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    tick();
    this.clockTimer = setInterval(tick, 1000);
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
    this.runAnimation();
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onGlobalMouseMove, { passive: true });
    window.addEventListener('scroll', this.onHeroScroll, { passive: true });
    this.canvas.addEventListener('click', this.onCanvasClick);
  }

  ngOnDestroy(): void {
    clearTimeout(this.typeTimer);
    clearInterval(this.clockTimer);
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onGlobalMouseMove);
    window.removeEventListener('scroll', this.onHeroScroll);
    this.canvas?.removeEventListener('click', this.onCanvasClick);
  }

  private onResize = (): void => {
    this.resize();
    this.initParticles();
  };

  private onHeroScroll = (): void => {
    const sy = window.scrollY;
    const vh = window.innerHeight;
    this.heroOpacity = Math.max(0, 1 - (sy / vh) * 1.6);
    this.photoScrollY = sy * 0.18;
    this.textScrollY  = sy * 0.1;
  };

  private onCanvasClick = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 2;
      const speed = Math.random() * 3 + 1.2;
      const life = Math.random() * 40 + 25;
      this.bursts.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life, maxLife: life, size: Math.random() * 2 + 1 });
    }
  };

  private onGlobalMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    const count = Math.min(65, Math.floor(window.innerWidth / 22));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.3 + 0.4,
      opacity: Math.random() * 0.28 + 0.05,
    }));
    this.shapes = Array.from({ length: 8 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 20 + 8,
      opacity: Math.random() * 0.055 + 0.012,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005,
      sides: Math.random() > 0.5 ? 6 : 3,
    }));
  }

  private runAnimation = (): void => {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    // Floating geometric shapes (background layer)
    for (const s of this.shapes) {
      s.x += s.vx; s.y += s.vy; s.rotation += s.rotationSpeed;
      if (s.x < -s.size * 2) s.x = width + s.size;
      if (s.x > width + s.size * 2) s.x = -s.size;
      if (s.y < -s.size * 2) s.y = height + s.size;
      if (s.y > height + s.size * 2) s.y = -s.size;
      this.ctx.save();
      this.ctx.translate(s.x, s.y);
      this.ctx.rotate(s.rotation);
      this.ctx.strokeStyle = `rgba(94,234,212,${s.opacity})`;
      this.ctx.lineWidth = 0.7;
      this.ctx.beginPath();
      for (let i = 0; i < s.sides; i++) {
        const angle = (i / s.sides) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * s.size;
        const py = Math.sin(angle) * s.size;
        i === 0 ? this.ctx.moveTo(px, py) : this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }

    for (const p of this.particles) {
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        p.vx += (dx / dist) * 0.013;
        p.vy += (dy / dist) * 0.013;
      }
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.3) { p.vx = (p.vx / speed) * 1.3; p.vy = (p.vy / speed) * 1.3; }

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(94,234,212,${p.opacity})`;
      this.ctx.fill();
    }

    // Particle-to-particle connections
    const maxDist = 130;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(94,234,212,${(1 - d / maxDist) * 0.1})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    // Cursor constellation — glowing lines from nearby particles to cursor
    const constellationRadius = 160;
    for (const p of this.particles) {
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < constellationRadius) {
        const alpha = (1 - d / constellationRadius) * 0.55;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.strokeStyle = `rgba(94,234,212,${alpha})`;
        this.ctx.lineWidth = 1 + (1 - d / constellationRadius) * 1.2;
        this.ctx.stroke();
      }
    }

    // Cursor node on canvas
    if (this.mouseX > 0 || this.mouseY > 0) {
      const grad = this.ctx.createRadialGradient(this.mouseX, this.mouseY, 0, this.mouseX, this.mouseY, 18);
      grad.addColorStop(0, 'rgba(94,234,212,0.35)');
      grad.addColorStop(1, 'rgba(94,234,212,0)');
      this.ctx.beginPath();
      this.ctx.arc(this.mouseX, this.mouseY, 18, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();
    }

    // Burst particles from click
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.96;
      b.vy *= 0.96;
      b.life--;
      const alpha = (b.life / b.maxLife) * 0.85;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.size * (b.life / b.maxLife), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(94,234,212,${alpha})`;
      this.ctx.fill();
      if (b.life <= 0) this.bursts.splice(i, 1);
    }

    this.animFrameId = requestAnimationFrame(this.runAnimation);
  };

  onMouseMove(e: MouseEvent): void {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    this.photoX = x * 14;
    this.photoY = y * 9;
  }

  resetParallax(): void {
    this.photoX = 0;
    this.photoY = 0;
  }

  onButtonMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  onButtonLeave(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = '';
  }

  private typeNext(): void {
    const current = this.taglines[this.taglineIndex];
    let i = 0;
    this.typingDone = false;
    const typeChar = () => {
      if (i < current.length) {
        this.typedTagline += current[i++];
        this.typeTimer = setTimeout(typeChar, 55);
      } else {
        this.typingDone = true;
        this.typeTimer = setTimeout(() => this.deleteTagline(), 2200);
      }
    };
    typeChar();
  }

  private deleteTagline(): void {
    this.typingDone = false;
    const deleteChar = () => {
      if (this.typedTagline.length > 0) {
        this.typedTagline = this.typedTagline.slice(0, -1);
        this.typeTimer = setTimeout(deleteChar, 28);
      } else {
        this.taglineIndex = (this.taglineIndex + 1) % this.taglines.length;
        this.typeTimer = setTimeout(() => this.typeNext(), 300);
      }
    };
    deleteChar();
  }
}
