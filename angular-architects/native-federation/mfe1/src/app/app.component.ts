import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare global {
  interface Window {
    shellActive: boolean;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'mfe1';
}
