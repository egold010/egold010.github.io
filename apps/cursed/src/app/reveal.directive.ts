import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add('reveal-text-hidden');
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('reveal-text-visible');
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(this.el.nativeElement);
  }
}
