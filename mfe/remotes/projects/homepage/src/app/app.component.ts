import { Component } from '@angular/core';
import { PluginProxyComponent } from './plugin-proxy/plugin-proxy.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PluginProxyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'homepage';
}
