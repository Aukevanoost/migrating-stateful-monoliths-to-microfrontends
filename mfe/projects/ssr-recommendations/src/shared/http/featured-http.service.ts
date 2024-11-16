import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class FeaturedHttpService {
    http = inject(HttpClient);
    api = "http://localhost:8081/v1";
    
    public teasers$(): Observable<any> {
        return this.http.get(`${this.api}/featured/teasers`);
    }

    public recommendations$(): Observable<any> {
        return of([
            {
              sku: 'AU-01-SI',
              name: 'TerraFirma AutoCultivator T-300',
              image: '/img/product/[size]/AU-01-SI.webp',
              productSku: 'AU-01'
            },
            {
              sku: 'CL-11-SK',
              name: 'Scandinavia Sower',
              image: '/img/product/[size]/CL-11-SK.webp',
              productSku: 'CL-11'
            },
            {
              sku: 'CL-08-GR',
              name: 'Holland Hamster',
              image: '/img/product/[size]/CL-08-GR.webp',
              productSku: 'CL-08'
            },
            {
              sku: 'CL-10-SD',
              name: 'Global Gallant',
              image: '/img/product/[size]/CL-10-SD.webp',
              productSku: 'CL-10'
            }
          ]);
    }
}