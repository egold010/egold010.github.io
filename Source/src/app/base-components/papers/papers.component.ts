import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const list = document.querySelector('.paper-list') as HTMLElement;
    if (!list) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = list.querySelectorAll<HTMLElement>('.paper-card');
          cards.forEach((card, i) => {
            card.style.animationDelay = (i * 80) + 'ms';
            card.classList.add('card-enter');
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    obs.observe(list);
  }

  onCardTilt(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.transition = 'box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease';
    const rect = el.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    el.style.transform = `perspective(900px) rotateX(${-x * 4}deg) rotateY(${y * 4}deg) translateZ(6px)`;
    el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
  }

  resetTilt(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.transition = 'transform 0.5s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease';
    el.style.transform = '';
  }

  papers = [
    {
      title: 'VGGT-SLAM: Purely Vision Based SLAM',
      link: 'VGGT-SLAM',
      date: 'May 2025',
    },
    {
      title: 'Evaluating π0 on Long-horizon Manipulation Tasks',
      link: 'EvaluatingPi0',
      date: 'March 2025',
    },
    {
      title: 'Context Aware GAN Image Compression',
      link: 'ImageCompression',
      date: 'March 2025',
    },
    {
      title: 'Synthetic Depth and Semantic Dataset Generation from Minecraft',
      link: 'MCData',
      date: 'November 2024',
    },
    {
      title: 'Deep RL Models with Raw Pixel Data',
      link: 'RawPixelRL',
      date: 'November 2024',
    },
  ]

}
