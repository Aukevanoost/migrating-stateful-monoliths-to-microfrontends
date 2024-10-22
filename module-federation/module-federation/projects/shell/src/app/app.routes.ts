import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteEntry, loadRemoteModule } from '@angular-architects/module-federation';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    // {
    //     path: 'mfe',
    //     loadComponent: () => import('mfe1/Component').then(m => m.AppComponent)
    // }
    {
        path: 'mfe',
        loadComponent: () => loadRemoteModule({type: 'manifest', remoteName: 'mfe1', exposedModule: './Component' }).then(m => m.AppComponent)
    }
];
