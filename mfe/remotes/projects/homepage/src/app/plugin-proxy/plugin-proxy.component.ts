import { Component, Input, OnChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
    selector: 'plugin-proxy',
    template: `<ng-container #placeHolder></ng-container>`,
    styles: []
})
export class PluginProxyComponent implements OnChanges {
    @ViewChild('placeHolder', {read: ViewContainerRef, static: true})
    viewContainer!: ViewContainerRef;

    @Input() remote!: {remoteName: string, component: string };

    constructor() {  }


    async ngOnChanges() {
        this.viewContainer.clear();

        const Component = await loadRemoteModule(this.remote.remoteName!, "./Component")
                                    .then(m => m[this.remote.component]);

        this.viewContainer.createComponent(Component);
    }
}