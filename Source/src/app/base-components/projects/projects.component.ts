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

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location
  ) { }

  projects = Projects

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('project')
    console.log(this.projectName)
    this.projectSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/item-details/' + this.projectName + '.html')
  }

}
