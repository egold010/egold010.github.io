import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  constructor(
    protected router: Router,
    private route: ActivatedRoute,) { }

  paperName: string | null = null
  paperLink: string | null = null

  ngOnInit(): void {
    this.paperName = this.route.snapshot.paramMap.get('title')
    this.paperLink = 'assets/papers/' + this.paperName + '.pdf'
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
