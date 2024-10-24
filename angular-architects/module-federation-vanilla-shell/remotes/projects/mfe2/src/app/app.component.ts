import { Component } from '@angular/core';

@Component({
  selector: 'mfe-two-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe2';
  constructor() {
    console.log();
  }
}
