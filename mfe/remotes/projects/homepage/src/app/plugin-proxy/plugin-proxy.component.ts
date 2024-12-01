import { Component, input, effect, inject, ChangeDetectorRef, signal, ChangeDetectionStrategy } from "@angular/core";
import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'plugin-proxy',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-container *ngComponentOutlet="remoteComponent()" /> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginProxyComponent {
    remoteComponent = signal<any|undefined>(undefined);

    cdr = inject(ChangeDetectorRef);
    remote = input.required<{remoteName: string, component: string}>();
    
    constructor() {
        effect(() => {
            this.loadComponent(this.remote());
        }, {allowSignalWrites: true});
    }

    private async loadComponent(remote: {remoteName: string, component: string}) {
        return loadRemoteModule(remote.remoteName, "./Component")
            .then(m => this.remoteComponent.set(m[remote.component]));
    }
}