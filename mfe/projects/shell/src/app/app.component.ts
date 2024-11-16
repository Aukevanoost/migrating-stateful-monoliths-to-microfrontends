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
  config: WrapperConfig = {
    remoteName: 'exp-teasers',
    exposedModule: './web-component',
    elementName: 'exp-teasers',
    fragmentUrl: 'http://localhost:4001/'
  };
  platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformServer(this.platformId) && this.config.fragmentUrl) {
      console.log('APP IN SERVER');
    } else if (isPlatformBrowser(this.platformId)) {
      console.log('APP IN BROWSER');
    }
    (globalThis as any).ngZone = inject(NgZone);
  }
}
