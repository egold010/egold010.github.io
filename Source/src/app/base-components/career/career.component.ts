import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  timeline = [
    {
      title: 'Robotics Engineer (Part-Time)',
      company: 'Pursuit Robotics',
      link: 'https://www.pursuitrobotics.com/',
      date: 'June 2025 - Present',
      description: 'Pre-seed robotics startup building autonomous security robots.',
      skills: ['C++', 'Python', 'ROS1', 'ROS2'],
      image: 'assets/timeline-images/pursuit.jpg',
    },
    {
      title: 'Autonomy Lead/Co-Founder',
      company: 'Aviat\'r',
      link: 'https://aviatr.ucrhighlanders.org/',
      date: 'Nov 2024 - June 2025 | 8 mos',
      description: 'Manages the computer vision and autonomous navigation subteams (6 members) at UCR\'s drone club.',
      skills: ['C++', 'Python'],
      image: 'assets/timeline-images/aviatr.jpg',
    },
    {
      title: 'Graduate Research Assistant',
      company: 'TASL',
      link: 'https://tasl.ucr.edu/',
      date: 'Oct 2024 - June 2025 | 9 mos',
      description: 'Trustworthy Autonomous Systems Laboratory. Advised by Prof. Jiachen Li.',
      skills: ['C++', 'Python', 'ROS2'],
      image: 'assets/timeline-images/tasl.png',
    },
    {
      title: 'R&D Intern',
      company: 'Standard Biotools',
      link: 'https://www.standardbio.com/',
      date: 'Jun 2024 - Sep 2024 | 4 mos',
      description: 'Worked on various data science and electrical engineering projects for a mass cytometry instrument.',
      skills: ['C++', 'Python'],
      image: 'assets/timeline-images/stdbio.jpg',
    },
    {
      title: 'Software Engineer (Part-Time)',
      company: 'Seer',
      link: 'https://seer.bio/',
      date: 'Oct 2022 - Sep 2023 | 1 yr',
      description: 'Continued my work as a part time employee while attending classes.',
      skills: ['C#', 'HTML', 'CSS', 'JavaScript'],
      image: 'assets/timeline-images/seer.jpg',
    },
    {
      title: 'R&D Intern',
      company: 'Seer',
      link: 'https://seer.bio/',
      date: 'Jun 2022 - Sep 2022 | 4 mos',
      description: 'Developed a customer facing UI for biotech instruments.',
      skills: ['C#', 'HTML', 'CSS', 'JavaScript'],
      image: 'assets/timeline-images/seer.jpg',
    },
    {
      title: 'R&D Intern',
      company: 'Fluidigm Corp.',
      link: 'https://www.standardbio.com/',
      date: 'Jun 2020 - Sep 2021 | 1 yr 4 mos',
      description: 'Built an internal dev tool used by engineers to run scripts and perform operations on the product.',
      skills: ['C#', 'C++', 'Python'],
      image: 'assets/timeline-images/fluidigm.png',
    }
  ]

}