import { afterNextRender, Component, inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { MFE_ENV } from '../shared/env';

@Component({
  selector: 'exp-teasers',
  imports: [fromCDNPipe, CommonModule],
  providers: [FeaturedHttpService],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeasersComponent {
  #env = inject(MFE_ENV);
  #platform = inject(PLATFORM_ID);
  #http = inject(FeaturedHttpService);

  teasers = toSignal(this.#http.teasers$(), { initialValue: [] });

  url(key: string) {
    return this.#env.mfe + '/products/' + key;
  }

  constructor() {
    afterNextRender(() => {
      console.log("Teasers hydration loaded, env: " + this.#platform);
    })
  }
}