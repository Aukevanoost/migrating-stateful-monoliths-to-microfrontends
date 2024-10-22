import { Route, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { MFeManifest } from './config';

const shellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    // --- STATIC REMOTE ROUTE
    // {
    //     path: 'mfe',
    //     loadComponent: () => import('mfe1/Component').then(m => m.AppComponent)
    // }
    // --- DYNAMIC REMOTE ROUTE
    // {
    //     path: 'mfe',
    //     loadComponent: () => loadRemoteModule({type: 'manifest', remoteName: 'mfe1', exposedModule: './Component' }).then(m => m.AppComponent)
    // }
];

export function buildRoutesFromManifest(options: MFeManifest): Routes {
    const lazyRoutes: Routes = Object.keys(options).map(key => {
        const {exposedModule, routePath, ngComponentName} = options[key];
        return {
            path: routePath,
            loadComponent: () => loadRemoteModule({type: 'manifest', remoteName: key, exposedModule }).then(m => m[ngComponentName])
        } as Route
    });
    return [...shellRoutes, ...lazyRoutes];
}


