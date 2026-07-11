import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coursework',
  templateUrl: './coursework.component.html',
  styleUrls: ['./coursework.component.css']
})
export class CourseworkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  coursework = {
    graduate: [
      'EE 227 - Reinforcement Learning',
      'EE 228 - Deep Learning',
      'EE 230 - Applied Linear Algebra for Engineering',
      'EE 231 - Advanged Digital Image Processing',
      'EE 243 - Advanced Computer Vision',
      'EE 245 - Robot Navigation',
      'EE 246 - Intelligent Transportation Systems',
      'EE 260 - Trustworthy Autonomous Systems',
    ],
    undergrad: [
      'Math 031, 131 - Linear Algebra',
      'Math 135A, 135B - Numerical Analysis',
      'Math 146A, 146B, 146C - ODEs and PDEs',
      'Phys 130A, 130B - Classical Mechanics',
      'Phys 135A, 135B - Electromagnetism',
      'Phys 136 - Electromagnetic Waves',
      'EE 120A, 120B - Embedded Systems',
      'EE 148 - Robotics and AI',
    ]
  };
}
