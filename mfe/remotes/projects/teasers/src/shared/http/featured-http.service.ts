import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FeaturedHttpService {
    http = inject(HttpClient);
    api = "http://localhost:8081/v1";
    
    public teasers$(): Observable<any> {
        return this.http.get(`${this.api}/featured/teasers`);
    }

    public recommendations$(sku: string[]): Observable<any> {
        return this.http.post(`${this.api}/featured/recommendations`, {sku});
    }
}