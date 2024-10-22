import { Component, OnInit } from '@angular/core';
import { PluginOptions } from './config';
import { NgFor } from '@angular/common';
import { LookupService } from './lookup.service';
import { PluginProxyComponent } from './plugin-proxy/plugin-proxy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, PluginProxyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shell';

  plugins: PluginOptions[] = [];

  constructor(private lookupService: LookupService) { }

  async ngOnInit(): Promise<void> {
    this.plugins = await this.lookupService.lookup();
  }
}
