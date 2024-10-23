import { Injector, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { createCustomElement} from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '**', component: HomeComponent },
          ])
    ],
    bootstrap: []
})
export class AppModule {
    constructor(private injector: Injector) {  }

    ngDoBootstrap() {
        const wc = createCustomElement(AppComponent, { injector: this.injector})
        customElements.define('mfe-two', wc);
    }
}