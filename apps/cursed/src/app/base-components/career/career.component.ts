import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { timeline as careerTimeline } from '@shared/career';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const entries = this.el.nativeElement.querySelectorAll('.timeline-entry');
    entries.forEach((entry: Element) => observer.observe(entry));

    const containerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('line-visible');
          containerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    });

    const timelineContainer = this.el.nativeElement.querySelector('.timeline-container');
    if (timelineContainer) {
      containerObserver.observe(timelineContainer);
    }
  }

  // Timeline data is shared with the portfolio app — see shared/career.ts
  timeline = careerTimeline;

}
