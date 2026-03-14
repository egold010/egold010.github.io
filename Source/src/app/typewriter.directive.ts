import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypewriter]'
})
export class TypewriterDirective implements OnInit {
  @Input() appTypewriter: string = '';
  @Input() typewriterSpeed: string | number = 50;
  @Input() typewriterDelay: string | number = 1000;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appTypewriter) {
      this.animateText();
    }
  }

  private get speed(): number {
    return typeof this.typewriterSpeed === 'string' ? parseInt(this.typewriterSpeed, 10) : this.typewriterSpeed;
  }

  private get delay(): number {
    return typeof this.typewriterDelay === 'string' ? parseInt(this.typewriterDelay, 10) : this.typewriterDelay;
  }

  private animateText() {
    const element = this.el.nativeElement;
    const text = this.appTypewriter;
    element.textContent = '';

    setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          // Add blinking cursor effect
          element.classList.add('typewriter-cursor');
        }
      }, this.speed);
    }, this.delay);
  }
}