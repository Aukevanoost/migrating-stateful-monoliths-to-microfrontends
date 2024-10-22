import { Component, Input, OnChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { PluginOptions } from "../config";
import { loadRemoteModule } from "@angular-architects/module-federation";

@Component({
    standalone: true,
    selector: 'plugin-proxy',
    template: `<ng-container #placeHolder></ng-container>`,
    styles: [
        `:host {width: 400px; height: 400px; background: #eee; display: flex}`
    ]
})
export class PluginProxyComponent implements OnChanges {
    @ViewChild('placeHolder', {read: ViewContainerRef, static: true})
    viewContainer!: ViewContainerRef;

    constructor() {  }

    @Input() options!: PluginOptions;

    async ngOnChanges() {
        this.viewContainer.clear();

        const Component = await loadRemoteModule(this.options)
            .then(m => m[this.options.componentName])

        this.viewContainer.createComponent(Component);
    }
}