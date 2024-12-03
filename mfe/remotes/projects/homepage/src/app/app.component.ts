import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginProxyComponent } from './plugin-proxy/plugin-proxy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PluginProxyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'homepage';
}
