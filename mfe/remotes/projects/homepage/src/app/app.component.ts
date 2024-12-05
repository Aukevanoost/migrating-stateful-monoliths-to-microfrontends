import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginProxyComponent } from './plugin-proxy/plugin-proxy.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PluginProxyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'homepage';
  #http = inject(HttpClient);

  teasers = signal<undefined|any>(undefined);
  recommendations = signal<undefined|any>(undefined);

  ngOnInit() {
    this.#http.get("http://localhost:3000/").forEach((cfg:any) => {

      const teasers: any = Object.values(cfg['explore/teasers'])[0]!;
      this.teasers.set({remoteName: teasers.module.remoteName, component: 'TeasersComponent'});

      const recommendations: any = Object.values(cfg['explore/recommendations'])[0]!;
      this.recommendations.set({remoteName: recommendations.module.remoteName, component: 'RecommendationsComponent'})

    })
  }
}
