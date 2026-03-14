import { Directive, ElementRef, Input, OnInit, OnDestroy, HostListener } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input() parallaxSpeed: number = 0.5;
  @Input() parallaxDirection: 'up' | 'down' | 'left' | 'right' = 'up';

  private animationFrame: number = 0;
  private initialTransform: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initialTransform = getComputedStyle(this.el.nativeElement).transform;
    this.updateParallax();
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(() => {
        this.updateParallax();
        this.animationFrame = 0;
      });
    }
  }

  private updateParallax() {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const elementTop = rect.top + scrollTop;
    const windowHeight = window.innerHeight;

    // Only apply parallax when element is in viewport
    if (elementTop < scrollTop + windowHeight && elementTop + rect.height > scrollTop) {
      const scrollProgress = (scrollTop - elementTop + windowHeight) / (windowHeight + rect.height);
      const parallaxValue = (scrollProgress - 0.5) * this.parallaxSpeed * 100;

      let transform = this.initialTransform;
      if (transform === 'none') {
        transform = '';
      }

      switch (this.parallaxDirection) {
        case 'up':
          transform += ` translateY(${parallaxValue}px)`;
          break;
        case 'down':
          transform += ` translateY(${-parallaxValue}px)`;
          break;
        case 'left':
          transform += ` translateX(${parallaxValue}px)`;
          break;
        case 'right':
          transform += ` translateX(${-parallaxValue}px)`;
          break;
      }

      element.style.transform = transform;
    }
  }
}