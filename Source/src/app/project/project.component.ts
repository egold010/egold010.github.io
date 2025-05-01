import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,) { }

  projectName: string | null = null
  projectSrc?: SafeUrl

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('title')
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

  iframeLoad(iframe: HTMLIFrameElement, backBtn: HTMLButtonElement) {
    if (iframe.contentWindow) {
      const doc = iframe.contentWindow.document;
      const height = Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight
      );
      iframe.style.height = height + 'px';
    }
    backBtn.style.opacity = '1';
  }

  scrollToSection(id: string) {
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Delay ensures content is rendered first
    });
  }
}
