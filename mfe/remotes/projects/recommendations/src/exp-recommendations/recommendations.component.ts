import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';
import { of } from 'rxjs';

@Component({
  selector: 'exp-recommendations',
  standalone: true,
  imports: [fromCDNPipe, CommonModule, AsyncPipe],
  providers: [FeaturedHttpService],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RecommendationsComponent {
  http = inject(FeaturedHttpService);

  @Input() set product(value: string) {
    const skus = value.split(',');
    this.recommendations$ = this.http.recommendations$(skus);
  }
  
  recommendations$ = of([] as any[]);
}
