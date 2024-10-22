import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MANIFEST, MFeManifest } from './config';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shell';
  routes: {displayName: string, routePath: string}[] = [];

  constructor(@Inject(MANIFEST) readonly remotes: MFeManifest) {
    this.routes = Object.values(remotes)
      .map(({displayName, routePath}) => ({displayName, routePath}));
  }

  ngOnInit(): void {  }
}
