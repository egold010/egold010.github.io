import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  showAllProjects = false;
  
  // Sample projects data - replace with your actual data
  relevantProjects = [
    {
      title: "YOLO in PyTorch",
      description: "Real-time object detection implementation",
      skills: ["PyTorch", "Python", "Computer Vision"]
    },
    {
      title: "VGGT Visual SLAM",
      description: "Visual SLAM system using VGG features",
      skills: ["C++", "OpenCV", "SLAM"]
    }
  ];

  hiddenProjects = [
    {
      title: "Website",
      description: "Personal portfolio website",
      skills: ["Angular", "TypeScript", "CSS"]
    }
    // Add more projects here
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleProjects() {
    this.showAllProjects = !this.showAllProjects;
  }
}