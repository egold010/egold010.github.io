import { Component, OnInit } from '@angular/core';
import { CardItem, Projects } from 'src/app/details';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  projects: CardItem[] = Projects;
  activeCategory: string = 'All';
  displayedProjects: CardItem[] = [];
  projectsPerPage: number = 6;

  categories: string[] = ['All', 'Machine Learning', 'Software', 'Electrical', 'Game Dev'];

  ngOnInit(): void {
    this.updateDisplayedProjects();
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.updateDisplayedProjects();
  }

  get filteredProjects(): CardItem[] {
    if (this.activeCategory === 'All') {
      return this.displayedProjects;
    }
    return this.displayedProjects.filter(project => project.category === this.activeCategory);
  }

  get hasMoreProjects(): boolean {
    return this.displayedProjects.length < this.projects.length;
  }

  loadMoreProjects(): void {
    const currentLength = this.displayedProjects.length;
    const nextBatch = this.projects.slice(currentLength, currentLength + this.projectsPerPage);
    this.displayedProjects = [...this.displayedProjects, ...nextBatch];
  }

  private updateDisplayedProjects(): void {
    // Show initial batch of projects, prioritizing relevant ones
    const relevantProjects = this.projects.filter(p => p.relevant);
    const otherProjects = this.projects.filter(p => !p.relevant);
    const initialProjects = [...relevantProjects, ...otherProjects].slice(0, this.projectsPerPage);
    this.displayedProjects = initialProjects;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Machine Learning': '🤖',
      'Software': '💻',
      'Electrical': '⚡',
      'Game Dev': '🎮',
      'General SW': '🛠️'
    };
    return icons[category] || '📁';
  }

  getCategoryCount(category: string): number {
    return this.projects.filter(p => p.category === category).length;
  }

  getSkillsToShow(project: CardItem): string[] {
    return project.skills?.slice(0, 2) || [];
  }

  getAdditionalSkillsCount(project: CardItem): number {
    const skillsLength = project.skills?.length || 0;
    return Math.max(0, skillsLength - 2);
  }

  getHoverSkills(project: CardItem): string[] {
    return project.skills?.slice(0, 3) || [];
  }

  onCardHover(project: CardItem, event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    // Add subtle glow effect
    card.style.boxShadow = '0 20px 40px rgba(14, 165, 233, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)';
  }

  onCardLeave(project: CardItem, event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    // Remove glow effect
    card.style.boxShadow = '';
  }
}
