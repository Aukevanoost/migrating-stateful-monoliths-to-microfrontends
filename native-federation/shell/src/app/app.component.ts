import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.shellActive = true;
  }

  @HostListener('window:mfeRouteRequest', ['$event'])
  onChildRouteChanged(event: any) {
    this.router.navigate([event.detail.route], event.detail.extras);
  }
}
