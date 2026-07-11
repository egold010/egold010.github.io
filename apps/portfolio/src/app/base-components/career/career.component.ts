import { Component, OnInit } from '@angular/core';
import { timeline as careerTimeline } from '@shared/career';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Timeline data is shared with the cursed app — see shared/career.ts
  timeline = careerTimeline;

}
