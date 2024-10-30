import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV } from '../../env/env.contract';
import { Observable } from "rxjs";

@Injectable()
export class FeaturedHttpService {
    http = inject(HttpClient);
    env = inject(ENV);

    public teasers$(): Observable<any> {
        // const headers = new HttpHeaders({
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        //   });

        return this.http.get(`${this.env.api}/featured/teasers`);
    }
}