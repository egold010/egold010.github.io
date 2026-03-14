import { Component, OnInit, OnDestroy, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ThemeService } from '../../theme.service';
import { Subscription } from 'rxjs';

interface Skill {
  name: string;
  level: number;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {
  @ViewChild('programmingChart', { static: true }) programmingChart!: ElementRef;
  @ViewChild('frameworkChart', { static: true }) frameworkChart!: ElementRef;
  @ViewChild('domainChart', { static: true }) domainChart!: ElementRef;

  private charts: Chart[] = [];
  private themeSubscription: Subscription = new Subscription();
  currentTheme: 'dark' | 'light' = 'dark';

  constructor(private themeService: ThemeService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      this.updateChartTheme();
    });
    this.createCharts();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.charts.forEach(chart => chart.destroy());
  }

  programmingSkills: Skill[] = [
    { name: 'Python', level: 95 },
    { name: 'C++', level: 90 },
    { name: 'JavaScript/TypeScript', level: 85 },
    { name: 'C#', level: 80 },
    { name: 'Java', level: 75 },
    { name: 'MATLAB', level: 70 }
  ];

  frameworkSkills: Skill[] = [
    { name: 'ROS2', level: 90 },
    { name: 'PyTorch', level: 85 },
    { name: 'TensorFlow', level: 80 },
    { name: 'Angular', level: 75 },
    { name: 'React', level: 70 },
    { name: 'OpenCV', level: 85 }
  ];

  toolSkills: Skill[] = [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 80 },
    { name: 'Linux', level: 85 },
    { name: 'CMake', level: 80 },
    { name: 'Gazebo', level: 75 },
    { name: 'Unity Engine', level: 70 }
  ];

  domainSkills: Skill[] = [
    { name: 'Machine Learning', level: 85 },
    { name: 'Computer Vision', level: 90 },
    { name: 'Robotics', level: 95 },
    { name: 'Autonomous Systems', level: 85 },
    { name: 'Embedded Systems', level: 80 },
    { name: 'SLAM', level: 85 }
  ];

  allTechnologies: string[] = [
    'Python', 'C++', 'ROS2', 'PyTorch', 'Computer Vision', 'SLAM',
    'Machine Learning', 'Deep Learning', 'Reinforcement Learning', 'Angular',
    'TypeScript', 'JavaScript', 'Git', 'Docker', 'Linux', 'CMake',
    'Gazebo', 'Unity', 'TensorFlow', 'OpenCV', 'MATLAB', 'C#',
    'Java', 'Arduino', 'Raspberry Pi', 'CUDA', 'PCL', 'OpenGL'
  ];

  getRandomAosEffect(): string {
    const effects = ['fade-in', 'zoom-in', 'flip-up'];
    return effects[Math.floor(Math.random() * effects.length)];
  }

  getRandomDelay(): string {
    return (Math.floor(Math.random() * 500) + 100).toString();
  }

  private createCharts(): void {
    const isDark = this.currentTheme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

    // Programming Languages Radar Chart
    const programmingCtx = this.programmingChart.nativeElement.getContext('2d');
    const programmingChart = new Chart(programmingCtx, {
      type: 'radar',
      data: {
        labels: this.programmingSkills.map(skill => skill.name),
        datasets: [{
          label: 'Proficiency Level',
          data: this.programmingSkills.map(skill => skill.level),
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          borderColor: 'rgba(14, 165, 233, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(14, 165, 233, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(14, 165, 233, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: gridColor
            },
            angleLines: {
              color: gridColor
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    // Frameworks & Libraries Radar Chart
    const frameworkCtx = this.frameworkChart.nativeElement.getContext('2d');
    const frameworkChart = new Chart(frameworkCtx, {
      type: 'radar',
      data: {
        labels: this.frameworkSkills.map(skill => skill.name),
        datasets: [{
          label: 'Proficiency Level',
          data: this.frameworkSkills.map(skill => skill.level),
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(34, 197, 94, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(34, 197, 94, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: gridColor
            },
            angleLines: {
              color: gridColor
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    // Domain Expertise Radar Chart
    const domainCtx = this.domainChart.nativeElement.getContext('2d');
    const domainChart = new Chart(domainCtx, {
      type: 'radar',
      data: {
        labels: this.domainSkills.map(skill => skill.name),
        datasets: [{
          label: 'Proficiency Level',
          data: this.domainSkills.map(skill => skill.level),
          backgroundColor: 'rgba(251, 146, 60, 0.2)',
          borderColor: 'rgba(251, 146, 60, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(251, 146, 60, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(251, 146, 60, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: gridColor
            },
            angleLines: {
              color: gridColor
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    this.charts = [programmingChart, frameworkChart, domainChart];
  }

  private updateChartTheme(): void {
    const isDark = this.currentTheme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

    this.charts.forEach(chart => {
      if (chart.options.scales && (chart.options.scales as any)['r']) {
        const rScale = (chart.options.scales as any)['r'];
        rScale.grid = { color: gridColor };
        rScale.pointLabels = { color: textColor };
      }
      chart.update();
    });
  }
}
