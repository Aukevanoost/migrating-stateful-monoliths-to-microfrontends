import { Component, input, effect, inject, ChangeDetectionStrategy, PLATFORM_ID, DestroyRef, ExperimentalPendingTasks, signal, Type } from "@angular/core";
import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule, isPlatformServer } from "@angular/common";

@Component({
    selector: 'plugin-proxy',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-container *ngComponentOutlet="remoteComponent()" />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginProxyComponent {
    #pendingTasks = inject(ExperimentalPendingTasks);
    #destroyed = false;

    remote = input.required<{remoteName: string, component: string}>();

    #remoteComponent = signal<Type<Component>|null>(null);
    remoteComponent = this.#remoteComponent.asReadonly();

    constructor() {
        inject(DestroyRef).onDestroy(() => (this.#destroyed = true));

        effect(() => {
            this.loadComponent(this.remote());
        }, {allowSignalWrites: true});
    }

    private async loadComponent({remoteName, component}: {remoteName: string, component: string}) {
        const removeTask = this.#pendingTasks.add();

        try {
            const comp = await loadRemoteModule({ remoteName, exposedModule: './Component'})
                .then(m => m[component]);

            if (this.#destroyed) return;

            this.#remoteComponent.set(comp);
        } catch(e) {
            console.log(e);
        } finally {
            removeTask();
        }
    }
}