import { Component, OnInit } from '@angular/core';

interface TimelineItem {
  title: string;
  company: string;
  link: string;
  date: string;
  description: string;
  skills: string[];
  image: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpanded(item: TimelineItem): void {
    item.expanded = !item.expanded;
  }

  timeline: TimelineItem[] = [
    {
      title: 'Robotics Engineer',
      company: 'Duality AI',
      link: 'https://www.duality.ai/',
      date: 'Sep 2025 - Present',
      description: 'Integrating robots into a digital twin simulator for advanced autonomous system development and testing.',
      skills: ['Python', 'ROS2', 'UE5'],
      image: 'assets/timeline-images/duality.jpg',
      expanded: false
    },
    {
      title: 'Content Creator',
      company: 'Vibe Engineering',
      link: 'https://www.youtube.com/@vibe-engineering-10',
      date: 'Dec 2025 - Present',
      description: 'Creating educational content about robotics and engineering, sharing technical knowledge through videos and tutorials.',
      skills: ['Robotics', 'Engineering', 'Video Editing'],
      image: 'assets/timeline-images/vibe-engineering.png',
      expanded: false
    },
    {
      title: 'Robotics Engineer',
      company: 'Pursuit Robotics',
      link: 'https://www.pursuitrobotics.com/',
      date: 'June 2025 - Sep 2025',
      description: 'Contributed to a pre-seed robotics startup focused on building autonomous security robots, working on core autonomy and navigation systems.',
      skills: ['C++', 'Python', 'ROS1', 'ROS2'],
      image: 'assets/timeline-images/pursuit.jpg',
      expanded: false
    },
    {
      title: 'Autonomy Lead/Co-Founder',
      company: 'Aviat\'r',
      link: 'https://aviatr.ucrhighlanders.org/',
      date: 'Nov 2024 - June 2025',
      description: 'Led the computer vision and autonomous navigation subteams at UCR\'s drone club, managing 6 team members and developing advanced drone autonomy systems.',
      skills: ['C++', 'Python'],
      image: 'assets/timeline-images/aviatr.jpg',
      expanded: false
    },
    {
      title: 'Graduate Research Assistant',
      company: 'TASL',
      link: 'https://tasl.ucr.edu/',
      date: 'Oct 2024 - June 2025',
      description: 'Research assistant at the Trustworthy Autonomous Systems Laboratory, working under Prof. Jiachen Li on cutting-edge autonomous systems research.',
      skills: ['C++', 'Python', 'ROS2'],
      image: 'assets/timeline-images/tasl.png',
      expanded: false
    },
    {
      title: 'R&D Intern',
      company: 'Standard Biotools',
      link: 'https://www.standardbio.com/',
      date: 'Jun 2024 - Sep 2024',
      description: 'Worked on data science and electrical engineering projects for mass cytometry instruments, contributing to next-generation biotech tools.',
      skills: ['C++', 'Python'],
      image: 'assets/timeline-images/stdbio.jpg',
      expanded: false
    },
    {
      title: 'Software Engineer (Part-Time)',
      company: 'Seer',
      link: 'https://seer.bio/',
      date: 'Oct 2022 - Sep 2023',
      description: 'Continued development work on biotech software solutions while pursuing academic studies, maintaining and enhancing existing systems.',
      skills: ['C#', 'HTML', 'CSS', 'JavaScript'],
      image: 'assets/timeline-images/seer.jpg',
      expanded: false
    },
    {
      title: 'R&D Intern',
      company: 'Seer',
      link: 'https://seer.bio/',
      date: 'Jun 2022 - Sep 2022',
      description: 'Developed customer-facing user interfaces for biotech instruments, focusing on user experience and data visualization.',
      skills: ['C#', 'HTML', 'CSS', 'JavaScript'],
      image: 'assets/timeline-images/seer.jpg',
      expanded: false
    },
    {
      title: 'R&D Intern',
      company: 'Fluidigm Corp.',
      link: 'https://www.standardbio.com/',
      date: 'Jun 2020 - Sep 2021',
      description: 'Built internal development tools used by engineers to run scripts and perform operations on complex biotech products.',
      skills: ['C#', 'C++', 'Python'],
      image: 'assets/timeline-images/fluidigm.png',
      expanded: false
    }
  ]

}