import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface anchor {
  name: string,
  link: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Evan Goldman';

  constructor (protected router: Router) {}

  anchors: anchor[] = [
    { name: "Home", link: "/home" },
    { name: "Projects", link: "/projects" },
    { name: "Resume", link: "/resume" }
  ]
}