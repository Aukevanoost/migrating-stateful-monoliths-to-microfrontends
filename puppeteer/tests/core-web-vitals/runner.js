

import * as playwright from 'playwright-chromium';
import * as fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import {gatherPerformanceMetrics} from './gather-performance-metrics.js';

const writeFileAsync = promisify(fs.writeFile);
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

class PerformanceTester {
  constructor(config = {}) {
    this.config = {
      url: config.url || 'http://localhost:8080',
      path: `${__dirname}/results/${config?.folder ?? 'misc'}`,
      viewportWidth: config.viewportWidth || 1280,
      viewportHeight: config.viewportHeight || 800,
      waitTimeout: config.waitTimeout || 20000,
      throttling: {
        cpu: config.cpuThrottling || 4,  // 4x CPU slowdown
        // src: https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md#the-mobile-network-throttling-preset
        network: config.networkThrottling || {
          downloadThroughput: (1.5 * 1024 * 1024) / 8, // 1.6 Mbps
          uploadThroughput: (750 * 1024) / 8, // 750 Kbps
          latency: 150 // 150ms latency
        }
      }
    };
    this.performanceData = [];
    this.currentRun = 0;
  }

  async initBrowser() {
    this.browser = await playwright.chromium.launch();

    this.context = await this.browser.newContext({
      viewport: {
        width: this.config.viewportWidth,
        height: this.config.viewportHeight
      }
    });
    
    this.page = await this.context.newPage();

    await this.page.context().addInitScript(() => {
      window.cpuThrottling = true;
    });

    const client = await this.context.newCDPSession(this.page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: this.config.throttling.cpu });

    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: this.config.throttling.network.downloadThroughput,
      uploadThroughput: this.config.throttling.network.uploadThroughput,
      latency: this.config.throttling.network.latency
    });
  }


  setupLogging() {
    this.page.on('console', msg => console.log(`Page log: ${msg.text()}`));
    this.page.on('pageerror', err => console.error(`Page error: ${err}`));
    this.page.on('requestfailed', req => console.error(`Failed request: ${req.url()}`));
  }


  async runTest() {
    try {
      await this.initBrowser();
      this.setupLogging();
  
      console.log('Navigating to page...');
      await this.page.goto(this.config.url, {
        waitUntil: 'networkidle',
        timeout: this.config.waitTimeout
      });
  
      console.log('Gathering metrics...');
      const metrics = await this.page.evaluate(gatherPerformanceMetrics);
  
      this.performanceData.push({
        site: `${this.config.url}/`,
        timestamp: new Date(),
        metrics: this.formatMetrics(metrics),
        run: this.currentRun + 1
      });
    } catch (error) {
      console.error('Test run error:', error);
      this.performanceData.push({
        site: this.config.url,
        timestamp: new Date(),
        error: error.message,
        run: this.currentRun + 1
      });
    } finally {
      await this.cleanup();
    }
  }


  formatMetrics(metrics) {
    return {
      lcp: metrics.lcp ? metrics.lcp : null,
      fcp: metrics.fcp ? metrics.fcp : null,
      ttfb: metrics.ttfb ? metrics.ttfb : null,
      tti: metrics.tti ? metrics.tti : null,
      tbt: metrics.tbt ? metrics.tbt : null
    };
  }

  formatDateTime(dt) {
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    const seconds = dt.getSeconds().toString().padStart(2, '0');

    return { 
      date: `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`, 
      time: `${hours}:${minutes}:${seconds}`
    };
  }

  async cleanup() {
    if (this.page) await this.page.close().catch(console.error);
    if (this.context) await this.context.close().catch(console.error);
    if (this.browser) await this.browser.close().catch(console.error);
  }

  convertToCSV(data) {
    const headers = ['site', 'date', 'time', 'lcp', 'fcp', 'ttfb', 'tbt', 'error'];
    
    const rows = data.map(entry => {
      const metrics = entry.metrics || {};
      const { date, time } = this.formatDateTime(entry.timestamp);
      return [
        entry.site,
        date,
        time,
        metrics.lcp || '',
        metrics.fcp || '',
        metrics.ttfb || '',
        metrics.tbt || '',
        entry.error || ''
      ].map(value => `"${value}"`).join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  async saveResults() {
    try {
      if (!fs.existsSync(this.config.path)) {
        fs.mkdirSync(this.config.path, { recursive: true });
      }
      const filename = `${this.config.path}/${(new Date()).toISOString()}_results.csv`;
      const csvContent = this.convertToCSV(this.performanceData);
      await writeFileAsync(filename, csvContent);
      console.log(`Results saved to ${filename}`);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }

  async run(runs = 5) {
    console.log('====== STARTING TEST ======');

    console.log(`Starting ${runs} test run(s)...`);
    
    console.log('Throttling enabled:', {
      cpu: `${this.config.throttling.cpu}x slowdown`,
      network: {
        download: `${Math.round(this.config.throttling.network.downloadThroughput / 1024 / 1024 * 8)} Mbps`,
        upload: `${Math.round(this.config.throttling.network.uploadThroughput / 1024 * 8)} Kbps`,
        latency: `${this.config.throttling.network.latency}ms`
      }
    });

    for (let i = 0; i < runs; i++) {
      this.currentRun = i;
      console.log(`Run ${i + 1}/${runs}`);
      await this.runTest();
    }

    await this.saveResults();
    console.log('====== TEST COMPLETED ======');
  }
}

// Usage
const tester = new PerformanceTester({
  url: 'http://localhost:8080',
  folder: 'core-web-vitals'
});

tester.run(50).catch(console.error);