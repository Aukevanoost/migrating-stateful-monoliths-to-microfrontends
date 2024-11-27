import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';

@Component({
  selector: 'exp-recommendations',
  standalone: true,
  imports: [fromCDNPipe, CommonModule, AsyncPipe],
  providers: [FeaturedHttpService],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class RecommendationsComponent {
  http = inject(FeaturedHttpService);
  platform = inject(PLATFORM_ID);
  // recommendations$ = this.http.recommendations$(['CL-01-GY','AU-07-MT']);
  recommendations$ = this.http.recommendations$();

  // @Input() set product(value: string) {
  //   const skus = value.split(',');
  //   this.recommendations$ = this.http.recommendations$(skus);
  // }
  constructor() {
    console.log(this.platform);
  }
  
  //recommendations$ = of([] as any[]);
  
}
