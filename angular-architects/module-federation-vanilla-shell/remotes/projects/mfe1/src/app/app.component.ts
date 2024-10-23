import { Component } from '@angular/core';

@Component({
  selector: 'mfe-one-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe1';
  constructor() {
    console.log();
  }
}
