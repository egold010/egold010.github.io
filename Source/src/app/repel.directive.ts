import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRepel]'
})
export class RepelDirective {
  @Input() repelRadius = 100;
  @Input() repelForce = 0.5;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const distX = centerX - mouseX;
    const distY = centerY - mouseY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < this.repelRadius) {
      // Calculate repulsion vector
      const force = (this.repelRadius - distance) / this.repelRadius;
      const moveX = (distX / distance) * force * this.repelRadius * this.repelForce;
      const moveY = (distY / distance) * force * this.repelRadius * this.repelForce;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      el.style.transform = 'translate(0px, 0px)';
    }
  }
}
