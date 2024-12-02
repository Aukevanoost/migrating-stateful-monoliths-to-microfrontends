import { Component, inject, Input, PLATFORM_ID, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedHttpService, fromCDNPipe, MFE_ENV } from '@shared';

@Component({
  selector: 'exp-recommendations',
  standalone: true,
  imports: [fromCDNPipe, CommonModule],
  providers: [FeaturedHttpService],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RecommendationsComponent {
  #env = inject(MFE_ENV);
  #http = inject(FeaturedHttpService);
  platform = inject(PLATFORM_ID);

  #recommendations = signal<any[]>([]);
  recommendations = this.#recommendations.asReadonly();

  @Input() set product(value: string) {
    const skus = value.split(',');
    this.#http.recommendations$(skus).subscribe(x => {
      this.#recommendations.set(x);
    });
  }

  ngOnInit() {
    this.#http.recommendations$(["CL-01-GY", "AU-07-MT"]).subscribe(x => {
      this.#recommendations.set(x);
    });
  }

  url(productSku: string, sku: string) {
    return this.#env + '/product/' + productSku + '/' + sku;
  }  
}
