import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import {mapper} from './src/mapper';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use((req,res,next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires','0');
    next();
  });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('*.*', express.static(browserDistFolder, {
    setHeaders: addCorsHeaders
  }));

  server.get('/html', (req, res, next) => {
    const { baseUrl } = req;

    res = addCorsHeaders(res);

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: baseUrl,
        publicPath: browserDistFolder,
      })
      .then(mapper("exp-recommendations", baseUrl))
      .then((html) => res.send(html))
      .catch((err) => next(err));
  })

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
      })
      .then((html:any) => res.send(html))
      .catch((err:any) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4002;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

function addCorsHeaders(res: express.Response) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return res;
}
run();