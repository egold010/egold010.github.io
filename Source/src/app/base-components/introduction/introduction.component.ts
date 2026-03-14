import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  animations: [
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.animate-right', [
          style({ opacity: 0, transform: 'translateX(50px)' }),
          stagger('200ms', [
            animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class IntroductionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToNextSection() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}