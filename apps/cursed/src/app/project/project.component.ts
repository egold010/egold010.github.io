import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(
    protected router: Router,
    private route: ActivatedRoute
  ) { }

  projectName: string | null = null;
  projectHtml: string = '';

  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('title');
    window.scroll(0,0);
    
    if (this.projectName) {
      // Fetch the HTML content
      fetch(`assets/item-details/${this.projectName}.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          // Extract the body content from the HTML file
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          this.projectHtml = doc.body.innerHTML;
        })
        .catch(error => {
          console.error('Error loading project details:', error);
          this.projectHtml = '<p>Error loading project details.</p>';
        });
    }
  }

  scrollToSection(id: string) {
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
}
