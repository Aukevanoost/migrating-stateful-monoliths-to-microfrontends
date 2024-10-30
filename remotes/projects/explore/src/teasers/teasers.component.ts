import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toPathPipe } from '../utils/to-path.pipe';
import { FeaturedHttpService } from './http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'exp-root',
  standalone: true,
  imports: [toPathPipe, CommonModule, AsyncPipe],
  providers: [FeaturedHttpService],
  templateUrl: './teasers.component.html',
  styleUrls: ['./teasers.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TeasersComponent {
  http = inject(FeaturedHttpService);
  title = 'teasers';
  teasers$ = this.http.teasers$();

}
