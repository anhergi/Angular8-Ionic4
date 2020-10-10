import { animate, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const fadeInDownAnimation =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        // transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        // transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
        style({
            position: "absolute",
            top: "0px",
            width: "calc(100% - 30px)"
        }),
      animate('0.5s ease-out', style({
        opacity: 0,
        // transform: 'translateY(0)'
      }))
    ])
  ]);
