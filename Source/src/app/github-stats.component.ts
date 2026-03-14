import { Component, OnInit } from '@angular/core';

interface GitHubStat {
  label: string;
  value: string | number;
  description: string;
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  week: string;
  days: ContributionDay[];
}

@Component({
  selector: 'app-github-stats',
  template: `
    <section id="github-stats" class="section-padding bg-gradient-to-b from-gray-900/30 to-gray-950/30">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Open Source Impact
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full mb-8"></div>
            <p class="text-lg text-gray-400 max-w-3xl mx-auto">
              Active contributor to robotics, AI, and autonomous systems research.
              Building tools that advance the field and push technical boundaries.
            </p>
          </div>

          <!-- GitHub Stats Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div *ngFor="let stat of githubStats; let i = index"
                 class="stat-card group"
                 data-aos="fade-up"
                 [attr.data-aos-delay]="i * 100">

              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br {{ stat.color }} flex items-center justify-center text-white">
                  <span class="text-lg">{{ stat.icon }}</span>
                </div>
                <div *ngIf="stat.trend" class="flex items-center space-x-1">
                  <svg *ngIf="stat.trend === 'up'" class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-xs text-green-400">{{ stat.trendValue }}</span>
                </div>
              </div>

              <div class="text-3xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {{ stat.value }}
              </div>
              <div class="text-sm font-medium text-gray-300 mb-1">
                {{ stat.label }}
              </div>
              <div class="text-xs text-gray-400">
                {{ stat.description }}
              </div>
            </div>
          </div>

          <!-- Contribution Graph -->
          <div class="contribution-graph" data-aos="fade-up">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-white">Contribution Activity</h3>
              <div class="flex items-center space-x-2 text-sm text-gray-400">
                <span>Less</span>
                <div class="flex space-x-1">
                  <div class="w-3 h-3 rounded-sm bg-gray-800"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-900"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-700"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-500"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-300"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            <div class="contribution-grid">
              <div class="contribution-week" *ngFor="let week of contributionData">
                <div class="contribution-day"
                     *ngFor="let day of week.days"
                     [attr.data-level]="day.level"
                     [attr.title]="'{{ day.date }}: {{ day.count }} contributions'">
                </div>
              </div>
            </div>

            <div class="flex justify-between text-xs text-gray-400 mt-4">
              <span>{{ getDateFromWeeksAgo(52) }}</span>
              <span>{{ getDateFromWeeksAgo(0) }}</span>
            </div>
          </div>

          <!-- Top Repositories -->
          <div class="mt-16" data-aos="fade-up">
            <h3 class="text-2xl font-bold text-white mb-8 text-center">Featured Repositories</h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let repo of topRepos; let i = index"
                   class="repo-card group"
                   data-aos="fade-up"
                   [attr.data-aos-delay]="i * 150">

                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
                      {{ repo.name }}
                    </h4>
                    <p class="text-sm text-gray-400 mb-3 line-clamp-2">
                      {{ repo.description }}
                    </p>
                  </div>
                  <div class="ml-4">
                    <span class="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full border border-primary-500/20">
                      {{ repo.language }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-400">
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span>{{ repo.stars }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414z" clip-rule="evenodd"></path>
                      </svg>
                      <span>{{ repo.forks }}</span>
                    </div>
                  </div>
                  <span class="text-xs">Updated {{ repo.lastUpdate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stat-card {
      @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1;
    }

    .contribution-graph {
      @apply bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6;
    }

    .contribution-grid {
      display: grid;
      grid-template-columns: repeat(53, 1fr);
      gap: 2px;
      margin-bottom: 1rem;
    }

    .contribution-week {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .contribution-day {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      background-color: #1f2937;
      transition: all 0.2s ease;
    }

    .contribution-day[data-level="1"] {
      background-color: #0f5132;
    }

    .contribution-day[data-level="2"] {
      background-color: #166534;
    }

    .contribution-day[data-level="3"] {
      background-color: #16a34a;
    }

    .contribution-day[data-level="4"] {
      background-color: #4ade80;
    }

    .contribution-day:hover {
      transform: scale(1.5);
      box-shadow: 0 0 8px rgba(74, 222, 128, 0.5);
    }

    .repo-card {
      @apply bg-gray-800/40 backdrop-blur-sm border border-gray-600 rounded-xl p-6 hover:bg-gray-800/60 hover:border-gray-500 transition-all duration-300 hover:shadow-md;
    }

    /* Light mode support */
    body.light .stat-card {
      @apply bg-white/70 border-gray-200 hover:bg-white/80 hover:border-primary-500/50;
    }

    body.light .contribution-graph {
      @apply bg-white/50 border-gray-300;
    }

    body.light .repo-card {
      @apply bg-white/60 border-gray-300 hover:bg-white/80 hover:border-gray-400;
    }

    body.light .contribution-day {
      background-color: #f3f4f6;
    }

    body.light .contribution-day[data-level="1"] {
      background-color: #dcfce7;
    }

    body.light .contribution-day[data-level="2"] {
      background-color: #bbf7d0;
    }

    body.light .contribution-day[data-level="3"] {
      background-color: #86efac;
    }

    body.light .contribution-day[data-level="4"] {
      background-color: #4ade80;
    }
  `]
})
export class GithubStatsComponent implements OnInit {

  githubStats: GitHubStat[] = [
    {
      label: 'Repositories',
      value: '47',
      description: 'Open source projects',
      icon: '📁',
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      trendValue: '+12 this year'
    },
    {
      label: 'Commits',
      value: '1,247',
      description: 'Total contributions',
      icon: '💾',
      color: 'from-green-500 to-green-600',
      trend: 'up',
      trendValue: '+340 this year'
    },
    {
      label: 'Stars',
      value: '234',
      description: 'Project recognition',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
      trend: 'up',
      trendValue: '+89 this year'
    },
    {
      label: 'Followers',
      value: '156',
      description: 'Community impact',
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
      trend: 'up',
      trendValue: '+45 this year'
    }
  ];

  topRepos = [
    {
      name: 'autonomous-navigation-ros2',
      description: 'Advanced ROS2 navigation stack with SLAM and path planning for autonomous robots',
      language: 'Python',
      stars: 89,
      forks: 34,
      lastUpdate: '2 days ago'
    },
    {
      name: 'deep-learning-robotics',
      description: 'PyTorch implementations of deep learning algorithms for robotics applications',
      language: 'Python',
      stars: 156,
      forks: 67,
      lastUpdate: '1 week ago'
    },
    {
      name: 'computer-vision-pipeline',
      description: 'Real-time computer vision pipeline with object detection and tracking',
      language: 'C++',
      stars: 78,
      forks: 29,
      lastUpdate: '3 days ago'
    }
  ];

  contributionData: ContributionWeek[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateContributionData();
  }

  private generateContributionData(): void {
    const weeks = 52;
    const today = new Date();

    for (let week = 0; week < weeks; week++) {
      const weekData: ContributionWeek = {
        week: this.getDateFromWeeksAgo(weeks - week - 1),
        days: []
      };

      for (let day = 0; day < 7; day++) {
        // Generate realistic contribution patterns
        const baseDate = new Date(today);
        baseDate.setDate(today.getDate() - ((weeks - week - 1) * 7) - (6 - day));

        // Higher activity on weekdays, occasional high activity
        let contributionLevel = 0;
        const dayOfWeek = baseDate.getDay();
        const randomFactor = Math.random();

        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Weekdays
          if (randomFactor > 0.7) {
            contributionLevel = 4; // High activity
          } else if (randomFactor > 0.4) {
            contributionLevel = Math.floor(Math.random() * 3) + 1; // 1-3
          }
        } else { // Weekends
          if (randomFactor > 0.85) {
            contributionLevel = Math.floor(Math.random() * 3) + 1;
          }
        }

        weekData.days.push({
          date: baseDate.toISOString().split('T')[0],
          count: contributionLevel > 0 ? Math.floor(Math.random() * 8) + 1 : 0,
          level: contributionLevel as 0 | 1 | 2 | 3 | 4
        });
      }

      this.contributionData.push(weekData);
    }
  }

  getDateFromWeeksAgo(weeksAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - (weeksAgo * 7));
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}