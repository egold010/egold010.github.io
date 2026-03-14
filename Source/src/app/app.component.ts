import { Component, HostListener, OnInit } from '@angular/core';

import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { routeTransitionAnimations } from './route-animations';

interface anchor {
  name: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeTransitionAnimations]
})

export class AppComponent implements OnInit {
  title = 'Evan Goldman';
  
  id = "tsparticles";
  particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#7c3aed",
      },
      links: {
        color: "#3b82f6",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.4,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }

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
  scrollProgress = 0;
  showSplash = true;
  splashExists = true;

  bootLines: string[] = [];
  bootProgress = 0;

  // HUD Data
  timeString: string = '';
  uptimeString: string = '';
  latency: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  randomMemAddr: string = '0x00000000';
  private startTime: number = Date.now();

  private secretCode = ['h', 'a', 'c', 'k'];
  private keyIndex = 0;

  private destroyCode = ['e', 'x', 'p', 'l', 'o', 'd', 'e'];
  private destroyIndex = 0;

  private asciiCode = ['a', 's', 'c', 'i', 'i'];
  private asciiIndex = 0;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Check hack code
    if (event.key.toLowerCase() === this.secretCode[this.keyIndex]) {
      this.keyIndex++;
      if (this.keyIndex === this.secretCode.length) {
        this.triggerOverdrive();
        this.keyIndex = 0;
      }
    } else {
      this.keyIndex = 0;
    }

    // Check explode code
    if (event.key.toLowerCase() === this.destroyCode[this.destroyIndex]) {
      this.destroyIndex++;
      if (this.destroyIndex === this.destroyCode.length) {
        this.triggerDestroy();
        this.destroyIndex = 0;
      }
    } else {
      this.destroyIndex = 0;
    }
    
    // Check ascii code
    if (event.key.toLowerCase() === this.asciiCode[this.asciiIndex]) {
      this.asciiIndex++;
      if (this.asciiIndex === this.asciiCode.length) {
        document.body.classList.toggle('ascii-mode');
        this.asciiIndex = 0;
      }
    } else {
      this.asciiIndex = 0;
    }
  }

  triggerDestroy() {
    // Create a simple physics engine simulation
    const elements = Array.from(document.querySelectorAll('.glass, .image-container, .hero-console, h1, p, .button-container'));
    
    // Add physics canvas overlay
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);
    
    // Simple DOM element explosion effect
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Get current position
      const rect = htmlEl.getBoundingClientRect();
      
      // Detach and make fixed
      htmlEl.style.position = 'fixed';
      htmlEl.style.top = `${rect.top}px`;
      htmlEl.style.left = `${rect.left}px`;
      htmlEl.style.width = `${rect.width}px`;
      htmlEl.style.height = `${rect.height}px`;
      htmlEl.style.margin = '0';
      htmlEl.style.zIndex = '10000';
      htmlEl.style.transition = 'none';
      
      // Random velocities
      let vx = (Math.random() - 0.5) * 30;
      let vy = -Math.random() * 20 - 10;
      let rot = 0;
      let vRot = (Math.random() - 0.5) * 20;
      
      let x = rect.left;
      let y = rect.top;
      
      const animate = () => {
        vy += 1; // Gravity
        x += vx;
        y += vy;
        rot += vRot;
        
        // Floor bounce
        if (y > window.innerHeight - rect.height) {
          y = window.innerHeight - rect.height;
          vy *= -0.5;
          vx *= 0.8;
        }
        
        htmlEl.style.transform = `translate3d(${x - rect.left}px, ${y - rect.top}px, 0) rotate(${rot}deg)`;
        
        if (Math.abs(vy) > 0.1 || Math.abs(vx) > 0.1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    });
    
    // Reload page after a few seconds
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  triggerOverdrive() {
    document.body.classList.toggle('overdrive-mode');
  }

  ngOnInit() {
    // Speak boot sequence
    this.speakBootSequence();
    this.simulateIntenseBoot();
    this.initHUDTelemetry();
  }

  initHUDTelemetry() {
    setInterval(() => {
      const now = new Date();
      this.timeString = now.toISOString().split('T')[1].replace('Z', '');
      
      const uptimeMs = Date.now() - this.startTime;
      const hours = Math.floor(uptimeMs / 3600000);
      const minutes = Math.floor((uptimeMs % 3600000) / 60000);
      const seconds = Math.floor((uptimeMs % 60000) / 1000);
      this.uptimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      this.latency = Math.floor(Math.random() * 15) + 12; // Simulate 12-27ms ping
      
      if (Math.random() > 0.8) {
        const hexChars = '0123456789ABCDEF';
        this.randomMemAddr = '0x' + Array.from({length: 8}, () => hexChars[Math.floor(Math.random() * 16)]).join('');
      }
    }, 100);
  }

  simulateIntenseBoot() {
    const hexChars = '0123456789ABCDEF';
    const prefixes = ['[kernel]', '[sys]', '[net]', '[gpu]', '[auth]', '[mem]', '[drone]', '[ai]', '[slam]'];
    
    // Rapidly generate fake boot logs
    const interval = setInterval(() => {
      if (this.bootProgress >= 100) {
        clearInterval(interval);
        return;
      }
      
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const address = '0x' + Array.from({length: 8}, () => hexChars[Math.floor(Math.random() * 16)]).join('');
      const line = `${prefix} Loading block at ${address} ... OK`;
      
      this.bootLines.push(line);
      if (this.bootLines.length > 25) {
        this.bootLines.shift(); // Keep only last 25 lines
      }
      
      this.bootProgress += Math.random() * 3;
      if (this.bootProgress > 100) this.bootProgress = 100;
    }, 40); // Fast updates

    // Hide splash screen after animation completes
    setTimeout(() => {
      this.showSplash = false;
      setTimeout(() => {
        this.splashExists = false;
        this.initMatrixRain();
        this.initRadar();
      }, 800); // Wait for fade out transition
    }, 3200);
  }

  speakBootSequence() {
    if ('speechSynthesis' in window) {
      // Small delay to allow user interaction policy sometimes required, but usually works on first load if minimal
      setTimeout(() => {
        const msg = new SpeechSynthesisUtterance('Init System Boot. Loading Kernel. Welcome, Guest. Access Granted.');
        msg.rate = 1.2;
        msg.pitch = 0.8;
        // Try to find a robotic/Google voice
        const voices = window.speechSynthesis.getVoices();
        const robotVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Zira') || v.name.includes('Microsoft'));
        if (robotVoice) {
          msg.voice = robotVoice;
        }
        window.speechSynthesis.speak(msg);
      }, 500);
    }
  }

  // Web Audio API for UI sounds
  audioCtx: AudioContext | null = null;

  playClickSound() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }

  playHoverSound() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, this.audioCtx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height; // Random initial position
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'; // Fading trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#7c3aed'; // Purple rain
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  initRadar() {
    const canvas = document.getElementById('radar-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let angle = 0;
    const blips: {x: number, y: number, alpha: number}[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.max(canvas.width, canvas.height);

      // Grid circles
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sweep
      angle += 0.03;
      if (angle >= Math.PI * 2) angle = 0;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      
      const gradient = ctx.createConicGradient(0, 0, 0);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(0.1, 'rgba(59, 130, 246, 0)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Scanner line
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      
      ctx.restore();

      // Check cursor angle for blip
      const dx = this.mouseX - cx;
      const dy = this.mouseY - cy;
      let targetAngle = Math.atan2(dy, dx);
      if (targetAngle < 0) targetAngle += Math.PI * 2;

      // Simple collision detection for angle
      const diff = Math.abs(angle - targetAngle);
      if (diff < 0.05 || Math.abs(diff - Math.PI * 2) < 0.05) {
        if (Math.sqrt(dx*dx + dy*dy) < radius) {
          blips.push({ x: this.mouseX, y: this.mouseY, alpha: 1 });
        }
      }

      // Draw blips
      for (let i = blips.length - 1; i >= 0; i--) {
        const b = blips[i];
        if (b.alpha <= 0) {
          blips.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${b.alpha})`; // Green blip
        ctx.fill();
        ctx.strokeStyle = `rgba(16, 185, 129, ${b.alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 15 + (1 - b.alpha) * 20, 0, Math.PI * 2);
        ctx.stroke();

        b.alpha -= 0.02; // Fade out speed
      }

      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (scrollTop / docHeight) * 100;
    
    this.isBarHidden = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    this.isMenuOpen = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    const blob = document.getElementById('glow-blob');
    
    if (cursor && follower) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // We can use a slight delay for follower via CSS transition or JS. 
      // For now, setting it directly and letting CSS transition do the smooth trailing.
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }
    
    // Update Spotlight Layer
    const spotlight = document.getElementById('spotlight-layer');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle 400px at ${e.clientX}px ${e.clientY}px, transparent 0%, rgba(10, 10, 15, 0.85) 100%)`;
    }
    
    if (blob) {
      // Offset blob slightly so it trails smoothly or follows directly
      blob.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 3000, fill: 'forwards' });
    }
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    if (!cursor || !follower) return;

    if (
      target.tagName.toLowerCase() === 'a' || 
      target.tagName.toLowerCase() === 'button' || 
      target.closest('a') || 
      target.closest('button') || 
      target.classList.contains('clickable')
    ) {
      if (!cursor.classList.contains('hovering')) {
        this.playHoverSound();
      }
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    } else {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    }
  }

  @HostListener('window:click', ['$event'])
  onClick(e: MouseEvent) {
    this.playClickSound();
    
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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