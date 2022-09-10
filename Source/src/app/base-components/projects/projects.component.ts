import { Component, OnInit } from '@angular/core';
import { Projects } from '../../details';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  projects = Projects

  ngOnInit(): void {
  }

}
