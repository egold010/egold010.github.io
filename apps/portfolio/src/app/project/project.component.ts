import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  projectName: string | null = null;
  projectHtml: SafeHtml = '';
  loading: boolean = true;

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('title');
    window.scroll(0, 0);

    if (this.projectName) {
      // Fetch the detail HTML and inject it inline instead of loading it in an
      // iframe. The iframe used to wait for every image to finish downloading
      // before revealing anything (multiple MB per project), which left the
      // page blank; inline rendering shows the text immediately and lets the
      // images stream in.
      fetch(`assets/item-details/${this.projectName}.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          // Only the hero image (first one) loads eagerly; defer the rest so
          // large below-the-fold images/GIFs don't compete with the initial
          // render for bandwidth.
          const images = Array.from(doc.body.querySelectorAll('img'));
          images.forEach((img, i) => {
            // The detail HTML was authored for the old iframe (served from
            // assets/item-details/), so its image paths are relative like
            // "../details-images/...". Injected inline, those resolve against
            // the app's base href and 404. Rewrite them to base-href-relative
            // "assets/..." so they load in both the root and /portfolio/ builds.
            const src = img.getAttribute('src');
            if (src && src.startsWith('../')) {
              img.setAttribute('src', 'assets/' + src.slice(3));
            }
            img.setAttribute('decoding', 'async');
            if (i > 0) {
              img.setAttribute('loading', 'lazy');
            } else {
              img.setAttribute('fetchpriority', 'high');
            }
          });

          this.projectHtml = this.sanitizer.bypassSecurityTrustHtml(doc.body.innerHTML);
        })
        .catch(error => {
          console.error('Error loading project details:', error);
          this.projectHtml = this.sanitizer.bypassSecurityTrustHtml('<p>Error loading project details.</p>');
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
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
