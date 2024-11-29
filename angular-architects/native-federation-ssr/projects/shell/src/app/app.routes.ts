import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { DummyComponent } from './dummy/dummy.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'mfe1',
        loadComponent: () => loadRemoteModule({
            remoteName: 'mfe1',
            exposedModule: './Component',
            fallback: DummyComponent
        })
    }
];
