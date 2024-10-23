import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { startsWith, WebComponentWrapper, WebComponentWrapperOptions } from "@angular-architects/module-federation-tools";
import { HomeComponent } from "./home/home.component";

const APP_ROUTES: Routes = [
    {
        // path: 'mfe1',
        matcher: startsWith('mfe1'),
        component: WebComponentWrapper,
        data: {
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            remoteName: 'mfe1',
            exposedModule: './Component',
            elementName: 'mfe-one'
        } as WebComponentWrapperOptions
    },
    {
        matcher: startsWith('mfe2'),
        component: WebComponentWrapper,
        data: {
            type: 'module',
            remoteEntry: 'http://localhost:4202/remoteEntry.js',
            exposedModule: './Component',
            elementName: 'mfe-two'
        } as WebComponentWrapperOptions
    },
    {
        path: '**',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RouterModule.forRoot(APP_ROUTES)],
    bootstrap: [AppComponent]
})
export class AppModule {
   
}