import { Component, inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { FeaturedHttpService } from './../shared/http/featured-http.service';
import { CommonModule } from '@angular/common';
import { fromCDNPipe } from '../shared/from-cdn.pipe';

@Component({
  selector: 'exp-recommendations',
  standalone: true,
  imports: [fromCDNPipe, CommonModule],
  providers: [FeaturedHttpService],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class RecommendationsComponent {
  #base = "http://localhost:8080";
  http = inject(FeaturedHttpService);
  platform = inject(PLATFORM_ID);

  #recommendations = signal<any[]>([]);
  recommendations = this.#recommendations.asReadonly();

  @Input() set product(value: string) {
    const skus = value.split(',');
    this.http.recommendations$(skus).subscribe(x => {
      this.#recommendations.set(x)
    });
  }
  constructor() {
    this.http.recommendations$(["CL-01-GY", "AU-07-MT"]).subscribe(x => {
      this.#recommendations.set(x)
    });
  }

  url(productSku: string, sku: string) {
    return this.#base + '/product/' + productSku + '/' + sku;
  }  
}
