import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private initialX = 0;
  private initialY = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.cursor = 'grab';
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.style.zIndex = '100';
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    // Only drag if clicking on the header to avoid issues with text selection
    const target = event.target as HTMLElement;
    if (!target.classList.contains('console-header') && !target.closest('.console-header')) {
      return;
    }

    this.isDragging = true;
    this.el.nativeElement.style.cursor = 'grabbing';
    this.el.nativeElement.style.transition = 'none';

    this.startX = event.clientX;
    this.startY = event.clientY;

    const transform = window.getComputedStyle(this.el.nativeElement).transform;
    if (transform !== 'none') {
      const matrix = new DOMMatrix(transform);
      this.initialX = matrix.m41;
      this.initialY = matrix.m42;
    } else {
      this.initialX = 0;
      this.initialY = 0;
    }
    
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    const newX = this.initialX + dx;
    const newY = this.initialY + dy;

    this.el.nativeElement.style.transform = `translate(${newX}px, ${newY}px)`;
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      this.el.nativeElement.style.cursor = 'grab';
      this.el.nativeElement.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  }
}
