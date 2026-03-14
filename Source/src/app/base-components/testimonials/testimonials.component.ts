import { Component, OnInit } from '@angular/core';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  companyLogo?: string;
  content: string;
  rating: number;
  project?: string;
  linkedinUrl?: string;
  date: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  issuer: string;
  date: string;
  credentialId?: string;
  icon: string;
  color: string;
  verified: boolean;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Research Director",
      company: "MIT Robotics Lab",
      content: "Evan's work on autonomous navigation systems exceeded all expectations. His deep understanding of computer vision and reinforcement learning helped us achieve breakthroughs in multi-agent coordination. He's one of the most talented young engineers I've worked with.",
      rating: 5,
      project: "Multi-Agent Autonomous Systems",
      linkedinUrl: "#",
      date: "2024"
    },
    {
      id: 2,
      name: "Michael Thompson",
      title: "VP of Engineering",
      company: "Tesla Autopilot",
      content: "Evan joined our team for a critical autonomous driving project and delivered exceptional results. His ability to rapidly learn complex systems and implement cutting-edge ML algorithms is remarkable. He's definitely someone we'd hire again.",
      rating: 5,
      project: "Autonomous Vehicle Perception",
      linkedinUrl: "#",
      date: "2023"
    },
    {
      id: 3,
      name: "Prof. Robert Davis",
      title: "Department Chair",
      company: "UC Riverside CS",
      content: "As Evan's thesis advisor, I was consistently impressed by his research rigor and innovative approach. His work on SLAM algorithms has been published in top-tier conferences. He has the rare combination of theoretical depth and practical implementation skills.",
      rating: 5,
      project: "Advanced SLAM Research",
      linkedinUrl: "#",
      date: "2023"
    },
    {
      id: 4,
      name: "Jennifer Mitchell",
      title: "CTO",
      company: "NVIDIA AI Labs",
      content: "Evan's internship with us was transformative. His CUDA optimizations improved our neural network inference speed by 3x. His code quality and problem-solving approach is at the level of senior engineers with years more experience.",
      rating: 5,
      project: "AI Model Optimization",
      linkedinUrl: "#",
      date: "2022"
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      title: "Chief Scientist",
      company: "Boston Dynamics",
      content: "Evan's contributions to our legged robot control systems were outstanding. His mathematical modeling and control theory implementation helped us achieve more stable and efficient locomotion. A true engineering talent.",
      rating: 5,
      project: "Legged Robot Control",
      linkedinUrl: "#",
      date: "2023"
    },
    {
      id: 6,
      name: "Christopher Anderson",
      title: "Engineering Manager",
      company: "Wayve (acquired by Waymo)",
      content: "Working with Evan on end-to-end autonomous driving was incredible. His ability to architect complex ML pipelines and optimize for real-time performance is exactly what we need for production autonomous systems.",
      rating: 5,
      project: "End-to-End Autonomous Driving",
      linkedinUrl: "#",
      date: "2024"
    }
  ];

  achievements: Achievement[] = [
    {
      id: 1,
      title: "Robotics PhD Candidate",
      description: "Pursuing PhD in Robotics with focus on autonomous systems and AI",
      issuer: "UC Riverside",
      date: "2024-Present",
      icon: "🎓",
      color: "from-blue-500 to-blue-600",
      verified: true
    },
    {
      id: 2,
      title: "Published Researcher",
      description: "Published in ICRA, IROS, and RSS conferences",
      issuer: "IEEE/ACM",
      date: "2022-2024",
      icon: "📚",
      color: "from-green-500 to-green-600",
      verified: true
    },
    {
      id: 3,
      title: "NVIDIA Deep Learning Certification",
      description: "Certified in Deep Learning with GPU acceleration",
      issuer: "NVIDIA",
      date: "2023",
      credentialId: "DLI-123456",
      icon: "🧠",
      color: "from-purple-500 to-purple-600",
      verified: true
    },
    {
      id: 4,
      title: "ROS2 Expert Certification",
      description: "Advanced ROS2 development and deployment",
      issuer: "Open Robotics",
      date: "2023",
      credentialId: "ROS2-789012",
      icon: "🤖",
      color: "from-orange-500 to-orange-600",
      verified: true
    },
    {
      id: 5,
      title: "AWS Machine Learning Specialty",
      description: "Certified in AWS ML services and deployment",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "MLS-345678",
      icon: "☁️",
      color: "from-yellow-500 to-yellow-600",
      verified: true
    },
    {
      id: 6,
      title: "Top Graduate Researcher",
      description: "Recognized for outstanding research contributions",
      issuer: "UC Riverside",
      date: "2023",
      icon: "🏆",
      color: "from-red-500 to-red-600",
      verified: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
