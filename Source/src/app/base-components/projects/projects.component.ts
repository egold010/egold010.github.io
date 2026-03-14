import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CardItem, Projects } from 'src/app/details';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const list = document.querySelector('.project-list') as HTMLElement;
    if (!list) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = list.querySelectorAll<HTMLElement>('.project-card:not(.animate)');
          cards.forEach((card, i) => {
            card.style.animationDelay = (i * 90) + 'ms';
            card.classList.add('card-enter');
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    obs.observe(list);
  }

  showAllProjects = false;

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

  projects = Projects

  get relevantProjects() {
    return this.projects.filter(p => p.relevant);
  }

  get hiddenProjects() {
    return this.projects.filter(p => !p.relevant);
  }
}
