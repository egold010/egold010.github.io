import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTilt]'
})
export class TiltDirective {
  @Input() tiltMax = 15;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    this.el.nativeElement.style.willChange = 'transform';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    
    // Calculate mouse position relative to element center
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    // Calculate tilt
    const tiltX = -(y / (rect.height / 2)) * this.tiltMax;
    const tiltY = (x / (rect.width / 2)) * this.tiltMax;

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;

    // Set CSS variables for dynamic lighting/glare
    const glareX = ((event.clientX - rect.left) / rect.width) * 100;
    const glareY = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--glare-x', `${glareX}%`);
    el.style.setProperty('--glare-y', `${glareY}%`);
    el.style.setProperty('--tilt-x', `${tiltX}deg`);
    el.style.setProperty('--tilt-y', `${tiltY}deg`);

    // Apply parallax to image if it exists
    const img = el.querySelector('.project-image img');
    if (img) {
      img.style.transform = `translate3d(${tiltY * -1.5}px, ${tiltX * 1.5}px, 50px) scale(1.1)`;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    this.el.nativeElement.style.setProperty('--glare-x', '50%');
    this.el.nativeElement.style.setProperty('--glare-y', '50%');
    this.el.nativeElement.style.setProperty('--tilt-x', '0deg');
    this.el.nativeElement.style.setProperty('--tilt-y', '0deg');
    
    // Reset parallax image
    const img = this.el.nativeElement.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'translate3d(0, 0, 0) scale(1)';
    }
  }
}
