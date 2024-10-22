import { inject, Injectable } from "@angular/core";
import { PluginOptions } from "./config";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({providedIn: 'root'})
export class LookupService {
    http: HttpClient = inject(HttpClient);

    lookup(): Promise<PluginOptions[]> {
        return lastValueFrom(this.http.get<PluginOptions[]>('assets/plugins.json'));
        // return this.http.get<PluginOptions>('assets/plugins.json').toPromise();
        // return Promise.resolve([
        //     {
        //         type: 'module',
        //         remoteEntry: 'http://localhost:4201/remoteEntry.js',
        //         exposedModule: './Component',
        //         displayName: 'Micro Frontend 1',
        //         componentName: 'AppComponent'
        //     },
        //     {
        //         type: 'module',
        //         remoteEntry: 'http://localhost:4202/remoteEntry.js',
        //         exposedModule: './Component',
        //         displayName: 'Micro Frontend 2',
        //         componentName: 'AppComponent'
        //     }
        // ] as PluginOptions[])
    }
}
