import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMagnetic]'
})
export class MagneticDirective {
  @Input() magneticPull = 0.5;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * this.magneticPull;
    const y = (event.clientY - rect.top - rect.height / 2) * this.magneticPull;

    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = 'translate(0px, 0px)';
  }
}
