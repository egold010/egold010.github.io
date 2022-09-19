import { Component, OnInit } from '@angular/core';
import { Projects } from '../../details';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectName: string | null = null
  projectSrc?: SafeUrl

  categories: string[] = [
    "Work Experience",
    "Electrical",
    "General SW",
    "Game Dev",
    "Game Bot",
  ]

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location
  ) { }

  projects = Projects

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('project')
    this.projectSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/item-details/' + this.projectName + '.html')
  }

  iframeLoad(iframe: HTMLIFrameElement) {
    iframe.height = iframe.contentWindow?.document.body.scrollHeight.toString() + 'px'
    console.log(iframe.height)
  }

  hover(category?: string) {
    for (let project of this.projects)
      project.highlighted = project.category == category
  }
}
