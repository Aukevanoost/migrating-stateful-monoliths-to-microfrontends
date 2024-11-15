/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ApplicationRef, StaticProvider, Type } from '@angular/core';
import { ɵSERVER_CONTEXT, renderModule } from '@angular/platform-server';
import { renderApplication } from './custom-engine'; 
import * as fs from 'node:fs';

export interface CustomEngineOptions {
  /** A method that when invoked returns a promise that returns an `ApplicationRef` instance once resolved or an NgModule. */
  bootstrap?: Type<{}> | (() => Promise<ApplicationRef>);

  /** A set of platform level providers for all requests. */
  providers?: StaticProvider[];

  /** Enable request performance profiling data collection and printing the results in the server console. */
  enablePerformanceProfiler?: boolean;
}

export interface CustomEngineRenderOptions {
  /** A method that when invoked returns a promise that returns an `ApplicationRef` instance once resolved or an NgModule. */
  bootstrap?: Type<{}> | (() => Promise<ApplicationRef>);

  /** A set of platform level providers for the current request. */
  providers?: StaticProvider[];
  url?: string;
  document?: string;
  documentFilePath?: string;

  /**
   * Reduce render blocking requests by inlining critical CSS.
   * Defaults to true.
   */
  inlineCriticalCss?: boolean;

  /**
   * Base path location of index file.
   * Defaults to the 'documentFilePath' dirname when not provided.
   */
  publicPath?: string;
}

/**
 * A common engine to use to server render an application.
 */

export class CustomEngine {
  private readonly templateCache = new Map<string, string>();

  constructor(private options?: CustomEngineOptions) {}

  /**
   * Render an HTML document for a specific URL with specified
   * render options
   */
  async render(opts: CustomEngineRenderOptions): Promise<string> {
    var html = await this.renderApplication(opts);
    console.log(html);
    return html;
  }



  private async renderApplication(opts: CustomEngineRenderOptions): Promise<string> {
    const moduleOrFactory = this.options?.bootstrap ?? opts.bootstrap;
    if (!moduleOrFactory) {
      throw new Error('A module or bootstrap option must be provided.');
    }

    const extraProviders: StaticProvider[] = [
      { provide: ɵSERVER_CONTEXT, useValue: 'ssr' },
      ...(opts.providers ?? []),
      ...(this.options?.providers ?? []),
    ];

    // let document = opts.document;

    // if (!document && opts.documentFilePath) {
    //   document = await this.getDocument(opts.documentFilePath);
    // }
    let document = '<exp-teasers></exp-teasers>';
    
    console.log('----------------------------------------------------------------------------')
    console.log(document);
    console.log('----------------------------------------------------------------------------')

    const commonRenderingOptions = {
      url: opts.url,
      document,
    };

    return isBootstrapFn(moduleOrFactory)
      ? renderApplication(moduleOrFactory, {
          platformProviders: extraProviders,
          ...commonRenderingOptions,
        })
      : renderModule(moduleOrFactory, { extraProviders, ...commonRenderingOptions });
  }

  /** Retrieve the document from the cache or the filesystem */
  private async getDocument(filePath: string): Promise<string> {
    let doc = this.templateCache.get(filePath);

    if (!doc) {
      doc = await fs.promises.readFile(filePath, 'utf-8');
      this.templateCache.set(filePath, doc);
    }

    return doc;
  }
}

function isBootstrapFn(value: unknown): value is () => Promise<ApplicationRef> {
  // We can differentiate between a module and a bootstrap function by reading compiler-generated `ɵmod` static property:
  return typeof value === 'function' && !('ɵmod' in value);
}