import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
      <h1>Oops, not found</h1>
    `,
  styles: [`
    h1 {
      color: #1212b2;
      text-align: center;
      margin: 5rem;
      font-size: 38px;
    }
  `]
})

export class NotFoundComponent {}
