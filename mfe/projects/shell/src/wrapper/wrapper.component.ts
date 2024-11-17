import {
    Component,
    ElementRef,
    Input,
    OnInit,
    PLATFORM_ID,
    inject,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
  import { lastValueFrom } from 'rxjs';
  import { isPlatformServer, isPlatformBrowser } from '@angular/common';
  
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

  
    @Input() from?: string = undefined;
  
    ngOnInit() {
      if (isPlatformServer(this.platformId)) {
        this.loadFragment();
      }
    }
  
    async loadFragment() {
      if (!this.from) return;

      const result = await lastValueFrom(
        this.http.get(this.from, { responseType: 'text' })
      );

      this.elm.nativeElement.querySelector('#placeholder').innerHTML = result;
    }
  }