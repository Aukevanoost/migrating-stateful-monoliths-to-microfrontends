import { Component, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';
  teasers: string = "http://localhost:4001/mfe"

  platformId = inject(PLATFORM_ID);

  constructor() {
    (globalThis as any).ngZone = inject(NgZone);
  }
}
