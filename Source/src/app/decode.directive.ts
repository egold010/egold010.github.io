import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDecode]'
})
export class DecodeDirective implements OnInit {
  private originalText: string = '';
  private chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!';
  private interval: any;
  private isHovered: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Wait slightly to ensure content is fully loaded
    setTimeout(() => {
        this.originalText = this.el.nativeElement.innerText;
    }, 100);
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isHovered) return;
    this.isHovered = true;
    
    let iteration = 0;
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.el.nativeElement.innerText = this.originalText
        .split('')
        .map((letter: string, index: number) => {
          if (index < iteration) {
            return this.originalText[index];
          }
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');

      if (iteration >= this.originalText.length) {
        clearInterval(this.interval);
        this.el.nativeElement.innerText = this.originalText; // Ensure exact match at end
      }

      iteration += 1 / 3;
    }, 30);
  }

  @HostListener('mouseleave') onMouseLeave() {
      this.isHovered = false;
  }
}
