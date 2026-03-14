import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  skills = [
    { name: 'SLAM / Localization', level: 92, animated: false, color: '#5eead4' },
    { name: 'Python / ROS2', level: 90, animated: false, color: '#5eead4' },
    { name: 'Computer Vision', level: 88, animated: false, color: '#60a5fa' },
    { name: 'Deep Learning / PyTorch', level: 85, animated: false, color: '#a78bfa' },
    { name: 'C++ / Embedded Systems', level: 78, animated: false, color: '#60a5fa' },
    { name: 'Reinforcement Learning', level: 75, animated: false, color: '#34d399' },
  ];

  ngAfterViewInit(): void {
    // Count-up for stats
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.countUp(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));

    // Skill bar animation
    const skillsEl = document.querySelector('.skill-bars');
    if (skillsEl) {
      const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.skills.forEach((s, i) => setTimeout(() => s.animated = true, i * 110));
            skillObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      skillObs.observe(skillsEl);
    }
  }

  onStatTilt(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    el.style.transform = `perspective(600px) rotateX(${-x * 8}deg) rotateY(${y * 8}deg) translateZ(8px)`;
    el.style.transition = 'box-shadow 0.15s ease';
    el.style.boxShadow = `0 0 28px rgba(94,234,212,0.1), ${-y * 4}px ${-x * 4}px 20px rgba(0,0,0,0.5)`;
  }

  resetStatTilt(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
    el.style.boxShadow = '';
  }

  private countUp(el: HTMLElement): void {
    const text = el.textContent || '';
    const suffix = text.replace(/[0-9]/g, '');
    const target = parseInt(text);
    if (isNaN(target)) return;
    const duration = 1200;
    const startTime = performance.now();
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(update);
  }

}
