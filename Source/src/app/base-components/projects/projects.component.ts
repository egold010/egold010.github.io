import { Component, OnInit } from '@angular/core';
import { CardItem, Projects } from 'src/app/details';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  showAllProjects = false;

  projects = Projects

  get relevantProjects() {
    return this.projects.filter(p => p.relevant);
  }

  get hiddenProjects() {
    return this.projects.filter(p => !p.relevant);
  }
}
