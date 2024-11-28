import * as playwright from 'playwright-chromium';
import { gatherPerformanceMetrics } from './gather-performance-metrics.js';
import { saveMetricsToCSV } from './save-results-to-csv.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * Unthrottled memory power: ~3000
 * src: https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md#the-mobile-network-throttling-preset
 */


const heavilyThrottledSettings = {
  url: 'http://localhost:8080',
  path: `${__dirname}/results/core-web-vitals`,
  viewport: { width: 375, height: 812}, // IPhone 11
  throttling: {
    cpu: 10,  // https://lighthouse-cpu-throttling-calculator.vercel.app/ (input:3000)
    network: {
      download: (1.6 * 1024 * 1024) / 8,  // 1.6 Mbps
      upload: (750 * 1024) / 8,           // 750 Kbps
      latency: 150                        // 150 ms 
    }
  }
}


const throttledSettings = {
    url: 'http://localhost:8080',
    path: `${__dirname}/results/core-web-vitals`,
    viewport: { width: 375, height: 812}, // IPhone 11
    throttling: {
      cpu: 4,  // 4x CPU slowdown (default)
      network: {
        download: (1.6 * 1024 * 1024) / 8,  // 1.6 Mbps
        upload: (750 * 1024) / 8,           // 750 Kbps
        latency: 150                        // 150 ms 
      }
    }
  }
  
  const throttledSettingsNoLatency = {
    url: 'http://localhost:8080',
    path: `${__dirname}/results/core-web-vitals`,
    viewport: { width: 375, height: 812}, // IPhone 11
    throttling: {
      cpu: 4,  // 4x CPU slowdown (default)
      network: {
        download: (1.6 * 1024 * 1024) / 8,  // 1.6 Mbps
        upload: (750 * 1024) / 8,           // 750 Kbps
        latency: 0                       
      }
    }
  }
  
  const defaultSettings = {
    url: 'http://localhost:8080',
    path: `${__dirname}/results/core-web-vitals`,
    viewport: { width: 3024, height: 1964} // macbook
  }

async function getBrowser(cfg) {
  const browser = await playwright.chromium.launch({headless: false});

  const context = await browser.newContext({
    viewport: cfg.viewport
  });
  
  const page = await context.newPage();

  const client = await context.newCDPSession(page);

  await client.send('Network.enable');
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });

  if(cfg.throttling) {

    await page.context().addInitScript(() => {
      window.cpuThrottling = true;
    });
  
    await client.send('Emulation.setCPUThrottlingRate', { rate: cfg.throttling.cpu });
  

    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: cfg.throttling.network.download,
      uploadThroughput: cfg.throttling.network.upload,
      latency: cfg.throttling.network.latency
    });
  }


  // LOGGING
  page.on('console', msg => console.log(`Page log: ${msg.text()}`));
  page.on('pageerror', err => console.error(`Page error: ${err}`));
  page.on('requestfailed', req => console.error(`Failed request: ${req.url()}`));

  const cleanup = async() => {
    await client.detach();
    await page.close().catch(console.error);
    await context.close().catch(console.error);
    await browser.close().catch(console.error);
  }

  return { cleanup, browser, page, }
}

/**
 * ==========================
 */

async function runTest(cfg, idx) {
  const host = await getBrowser(cfg);
  const results = {
    site: `${cfg.url}/`,
    timestamp: new Date(),
    run: idx,
  };

  try{
    const beforeNav = Date.now();
    await host.page.goto(cfg.url, {
      waitUntil: 'networkidle',
      timeout: 20_000
    });
    const afterNav = Date.now();
    results.navToPageInMS = afterNav - beforeNav;
    console.log(`Navigation took ${results.navToPageInMS} ms`);


    results.metrics = await host.page.evaluate(gatherPerformanceMetrics);
    const afterTest = Date.now();

    results.testTotalTimeInMS = afterTest - beforeNav;

  } catch (error) {
    console.error('Test run error:', error);
    results.error = error.message;
  } finally {
    await host.cleanup();
  }

  return results;
}


async function runWebVitalsTests(cfg, runs = 1) {

  console.log('====== STARTING TEST ======');  
  if(cfg.throttling) {
    console.log();
    console.log(`CPU \t\t: ${cfg.throttling.cpu}x slower`);
    console.log(`download\t: ${cfg.throttling.network.download / 1024 / 1024 * 8} Mbps`);
    console.log(`upload\t\t: ${cfg.throttling.network.upload / 1024 * 8} Kbps`);
    console.log(`latency\t\t: ${cfg.throttling.network.latency} ms`);
    console.log();
  } else {
    console.log();
    console.log(`Throttling is disabled.`);
    console.log();
  }

  console.log(`Starting ${runs} test run(s)...`);

  const results = [];

  for (let i = 1; i <= runs; i++) {
    console.log(`Test run ${i}/${runs}`);
    const metrics = await runTest(cfg, i);
    results.push(metrics);
  }

  await saveMetricsToCSV(cfg.path, results);
  console.log('====== TEST COMPLETED ======');
}


runWebVitalsTests(heavilyThrottledSettings, 50).catch(console.error);