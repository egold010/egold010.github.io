import { Component, OnInit } from '@angular/core';
import { CardItem, Projects } from '../../details';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.css']
})
export class OtherProjectsComponent implements OnInit {

  projects: CardItem[]
  projectName: string | null = null
  projectSrc?: SafeUrl

  categories: string[] = [
    "General SW",
    "Game Dev",
    "Game Bot",
  ]

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location
  ) { this.projects = this.all_projects.filter(project => !project.relevant); }

  all_projects = Projects

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('project')
    this.projectSrc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/item-details/' + this.projectName + '.html')
    window.scroll(0,0)
  }

  iframeLoad(iframe: HTMLIFrameElement) {
    iframe.height = iframe.contentWindow?.document.body.scrollHeight.toString() + 'px'
  }

  hover(category?: string) {
    for (let project of this.projects)
      project.highlighted = project.category == category
  }
}
