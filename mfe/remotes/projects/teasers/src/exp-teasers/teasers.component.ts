import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { MFE_ENV, FeaturedHttpService, fromCDNPipe } from '@shared';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'exp-teasers',
  standalone: true,
  imports: [CommonModule, fromCDNPipe],
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