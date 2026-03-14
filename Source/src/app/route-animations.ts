import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    // Ensure container has relative positioning
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(40px) scale(0.98)', filter: 'blur(10px)' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 0, transform: 'translateY(-40px) scale(1.02)', filter: 'blur(10px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('600ms 400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' }))
      ], { optional: true })
    ])
  ])
]);
