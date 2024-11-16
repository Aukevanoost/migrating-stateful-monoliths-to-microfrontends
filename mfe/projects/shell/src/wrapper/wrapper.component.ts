import {
    Component,
    ElementRef,
    Input,
    OnInit,
    PLATFORM_ID,
    inject,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { loadRemoteModule } from '@softarc/native-federation-runtime';
  import { HttpClient } from '@angular/common/http';
  import { lastValueFrom } from 'rxjs';
  import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { initWrapperConfig } from './wrapper-config';
import { extractFragment } from './wrapper-helper';
  
  @Component({
    selector: 'app-wrapper',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
  })
  export class WrapperComponent implements OnInit {
    elm = inject(ElementRef);
    http = inject(HttpClient);
    platformId = inject(PLATFORM_ID);
  
    allowed = [
      'http://localhost:4201/',
    ];
  
    @Input() config = initWrapperConfig;
  
    ngOnInit() {
      if (isPlatformServer(this.platformId) && this.config.fragmentUrl) {
        this.loadFragment();
      } else if (isPlatformBrowser(this.platformId)) {
        this.loadComponent();
      }
    }
  
    async loadComponent() {
      const { exposedModule, remoteName, elementName } = this.config;
      await loadRemoteModule(remoteName, exposedModule);
      const elm = this.elm.nativeElement as HTMLElement;
      if (this.elm.nativeElement.querySelector('#placeholder').children.length === 0) {
        const root = document.createElement(elementName);
        this.elm.nativeElement.appendChild(root);
      }
    }
  
    async loadFragment() {
      const { fragmentUrl, elementName, remoteName } = this.config;
  
      const result = await lastValueFrom(
        this.http.get(fragmentUrl!, { responseType: 'text' })
      );

      const html = extractFragment(result, elementName);

      const style = extractFragment(result, 'style', 'ng-app-id', remoteName);
      const script = extractFragment(
        result,
        'script',
        'id',
        remoteName + `-state`
      );

      this.elm.nativeElement.querySelector('#placeholder').innerHTML = `${style}\n${script}\n${html}`;
    }
  }