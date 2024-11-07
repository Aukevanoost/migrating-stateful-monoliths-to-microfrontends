import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV } from '../../shared/env/env.contract';
import { Observable } from "rxjs";

@Injectable()
export class FeaturedHttpService {
    http = inject(HttpClient);
    env = inject(ENV);

    public recommendations$(sku: string[]): Observable<any> {
        return this.http.post(`${this.env.api}/featured/recommendations`, {sku});
    }
}