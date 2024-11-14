import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FeaturedHttpService } from './http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';

@Component({
  selector: 'exp-teasers',
  standalone: true,
  imports: [fromCDNPipe, CommonModule, AsyncPipe],
  providers: [FeaturedHttpService],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TeasersComponent {
  http = inject(FeaturedHttpService);
  teasers$ = this.http.teasers$();
}