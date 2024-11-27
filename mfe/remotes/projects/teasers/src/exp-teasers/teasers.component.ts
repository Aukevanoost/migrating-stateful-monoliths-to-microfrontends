import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'exp-teasers',
  standalone: true,
  imports: [fromCDNPipe, CommonModule, AsyncPipe],
  providers: [FeaturedHttpService],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeasersComponent {
  private http = inject(FeaturedHttpService);
  
  visible = signal(true);
  teasers = toSignal(this.http.teasers$(), { initialValue: [] });

  hide() {
    this.visible.set(false);
  }
}
