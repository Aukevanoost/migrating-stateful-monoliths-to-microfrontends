import { Component, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { WrapperConfig } from '../wrapper/wrapper-config';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';
  teasers: WrapperConfig = {
    remoteName: 'exp-teasers',
    exposedModule: './exp-teasers',
    elementName: 'exp-teasers',
    fragmentUrl: 'http://localhost:4001/'
  };
  recommendations: WrapperConfig = {
    remoteName: 'exp-recommendations',
    exposedModule: './exp-recommendations',
    elementName: 'exp-recommendations',
    fragmentUrl: 'http://localhost:4002/'
  };
  platformId = inject(PLATFORM_ID);

  constructor() {
    (globalThis as any).ngZone = inject(NgZone);
  }
}
