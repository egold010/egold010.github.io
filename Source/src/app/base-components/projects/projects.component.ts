import { Component, OnInit } from '@angular/core';
import { CardItem, Projects } from '../../details';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: CardItem[]
  projectName: string | null = null
  projectSrc?: SafeUrl

  categories: string[] = [
    "Electrical",
    "Machine Learning",
    "Software",
  ]

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location
  ) { this.projects = this.all_projects.filter(project => project.relevant); }

  all_projects = Projects

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('project')
    this.projectSrc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/item-details/' + this.projectName + '.html')
    window.scroll(0,0)

    window.addEventListener("message", function (event) {
      if (event.data.type === "resizeIframe") {
        const iframe = document.querySelector("iframe");
        if (iframe) {
          iframe.style.height = event.data.height + "px";
        }
      }
    });
  }

  iframeLoad(iframe: HTMLIFrameElement) {
    iframe.height = iframe.contentWindow?.document.body.scrollHeight.toString() + 'px'
  }

  hover(category?: string) {
    for (let project of this.projects)
      project.highlighted = project.category == category
  }
}
