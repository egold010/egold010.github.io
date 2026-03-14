import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
            const h1 = (entry.target as HTMLElement).querySelector('h1');
            if (h1) this.splitRevealHeading(h1);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  private splitRevealHeading(el: HTMLElement): void {
    // Find the primary text node (skip child elements like .title-subtext spans)
    const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE) as Text | undefined;
    if (!textNode || !textNode.textContent?.trim()) return;

    const text = textNode.textContent;
    const fragment = document.createDocumentFragment();

    const charDelay = 0.038;
    const lastDelay = (text.replace(/ /g, '').length - 1) * charDelay + 0.08;

    text.split('').forEach((char, i) => {
      if (char === ' ') {
        fragment.appendChild(document.createTextNode('\u00a0'));
        return;
      }
      const outer = document.createElement('span');
      outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;line-height:1;';
      const inner = document.createElement('span');
      inner.textContent = char;
      inner.style.cssText = `display:inline-block;animation:charReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${(i * charDelay + 0.08).toFixed(3)}s both;`;
      outer.appendChild(inner);
      fragment.appendChild(outer);
    });

    textNode.replaceWith(fragment);

    // Neon glow pulse fires after all characters have landed
    const pulseDelay = (lastDelay + 0.5) * 1000;
    setTimeout(() => el.classList.add('heading-neon-pulse'), pulseDelay);
  }

}
