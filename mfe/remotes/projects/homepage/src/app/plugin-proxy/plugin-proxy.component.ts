import { Component, input, effect, inject, ChangeDetectionStrategy, PLATFORM_ID, ViewContainerRef, Injector } from "@angular/core";
import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule, isPlatformBrowser } from "@angular/common";

@Component({
    selector: 'plugin-proxy',
    standalone: true,
    imports: [CommonModule],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginProxyComponent {
    #platformID = inject(PLATFORM_ID);
    #vcr = inject(ViewContainerRef);
    #injector = inject(Injector);
    // #environmentInjector = inject(EnvironmentInjector);

    remote = input.required<{remoteName: string, component: string}>();


    constructor() {
        if(isPlatformBrowser(this.#platformID)) {
            effect(() => {
                this.loadComponent(this.remote());
            }, {allowSignalWrites: true});
        }
    }

    private async loadComponent(remote: {remoteName: string, component: string}) {
        const comp = await loadRemoteModule(remote.remoteName, "./Component");
        try {
            const componentRef = this.#vcr.createComponent(comp[remote.component], {
                injector: this.#injector ,
                // environmentInjector: this.environmentInjector
            });
        }catch(e) {
            console.log(e);
        }
    }
}