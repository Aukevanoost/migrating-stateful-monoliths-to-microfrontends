import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV } from '../env/env.contract';
import { Observable, of } from "rxjs";

@Injectable()
export class FeaturedHttpService {
    http = inject(HttpClient);
    env = inject(ENV);

    // public teasers$(): Observable<any> {
    //     return this.http.get(`${this.env.api}/featured/teasers`);
    // }

    public teasers$(): Observable<any> {
        return of([
            {
                key: 'autonomous',
                image: 'img/scene/[size]/autonomous.webp',
                title: 'MOCK TRACTOR'
            },
            {
                key: 'classic',
                image: 'img/scene/[size]/classics.webp',
                title: 'MOCK TRACTOR'
            }
        ])
    }

    public recommendations$(sku: string[]): Observable<any> {
        return this.http.post(`${this.env.api}/featured/recommendations`, {sku});
    }
}