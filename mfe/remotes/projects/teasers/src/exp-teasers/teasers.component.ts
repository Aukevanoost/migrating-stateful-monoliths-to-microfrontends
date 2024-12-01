import { afterNextRender, Component, inject, PLATFORM_ID, signal, ViewEncapsulation } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'exp-teasers',
  standalone: true,
  imports: [fromCDNPipe, CommonModule],
  providers: [FeaturedHttpService],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeasersComponent {
  #base = "http://localhost:8080";
  platform = inject(PLATFORM_ID);
  #http = inject(FeaturedHttpService);

  teasers = toSignal(this.#http.teasers$(), { initialValue: [] });

  url(key: string) {
    return this.#base + '/products/' + key;
  }

  constructor() {
    afterNextRender(() => {
      console.log("Teasers hydration loaded, env: " + this.platform);
    })
  }
}