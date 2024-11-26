import * as playwright from 'playwright-chromium';
import * as fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const writeFileAsync = promisify(fs.writeFile);
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

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
        network: config.networkThrottling || {
          downloadThroughput: (1.5 * 1024 * 1024) / 8, // 1.5 Mbps
          uploadThroughput: (750 * 1024) / 8, // 750 Kbps
          latency: 150 // 150ms latency
        }
      }
    };
    this.performanceData = [];
    this.currentRun = 0;
  }

  async initBrowser() {
    this.browser = await playwright.chromium.launch({
      handleSIGINT: true,
      handleSIGTERM: true,
      handleSIGHUP: true
    });

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

    // Apply CPU throttling using Chrome DevTools Protocol
    const client = await this.context.newCDPSession(this.page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: this.config.throttling.cpu });

    // Apply network throttling
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: this.config.throttling.network.downloadThroughput,
      uploadThroughput: this.config.throttling.network.uploadThroughput,
      latency: this.config.throttling.network.latency
    });

    console.log('Throttling enabled:', {
      cpu: `${this.config.throttling.cpu}x slowdown`,
      network: {
        download: `${Math.round(this.config.throttling.network.downloadThroughput / 1024 / 1024 * 8)} Mbps`,
        upload: `${Math.round(this.config.throttling.network.uploadThroughput / 1024 * 8)} Kbps`,
        latency: `${this.config.throttling.network.latency}ms`
      }
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

      await this.page.addInitScript(() => {
        window._performanceMetrics = {
          lcp: null,
          fcp: null,
          ttfb: null,
          tti: null,
          tbt: null,
          longTasks: []
        };

        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            const task = {
              startTime: entry.startTime,
              duration: entry.duration,
              endTime: entry.startTime + entry.duration
            };
            window._performanceMetrics.longTasks.push(task);
          }
        }).observe({ type: 'longtask', buffered: true });  // Changed from type to entryTypes

        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries.at(-1);

          if (!window._performanceMetrics.lcp || lastEntry.startTime > window._performanceMetrics.lcp) {
            window._performanceMetrics.lcp = lastEntry.startTime;
          }

        }).observe({ type: 'largest-contentful-paint', buffered: true });

        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const paintEntry = entries.find(entry => entry.name === 'first-contentful-paint');

          if (paintEntry) {
            window._performanceMetrics.fcp = paintEntry.startTime;
          }
        }).observe({ type: 'paint', buffered:true});  // Changed from type

        // TTFB calculation - moved to after navigation completes
        window._performanceMetrics.calculateTTFB = () => {
          const navEntry = performance.getEntriesByType('navigation')[0];
          if (navEntry) {
            window._performanceMetrics.ttfb = navEntry.responseStart;
          }
        };

        function findFirstQuietWindow(tasks, searchStart) {
          const QUIET_WINDOW = 5000;
          const MAX_TIME = performance.now();
          
          if (!tasks.length) return searchStart;

          tasks.sort((a, b) => a.startTime - b.startTime);
          tasks = tasks.filter(task => task.startTime >= searchStart);
          
          if (!tasks.length) {
            return (MAX_TIME - searchStart >= QUIET_WINDOW) ? searchStart : null;
          }

          for (let i = 0; i < tasks.length - 1; i++) {
            const currentTaskEnd = tasks[i].endTime;
            const nextTaskStart = tasks[i + 1].startTime;
            
            if (nextTaskStart - currentTaskEnd >= QUIET_WINDOW) {
              return currentTaskEnd;
            }
          }

          const lastTaskEnd = tasks[tasks.length - 1].endTime;
          if (MAX_TIME - lastTaskEnd >= QUIET_WINDOW) {
            return lastTaskEnd;
          }

          return null;
        }

        window._performanceMetrics.calculateMetrics = () => {
          const metrics = window._performanceMetrics;
          
          // Calculate TTFB if not already done
          if (!metrics.ttfb) {
            metrics.calculateTTFB();
          }

          // Find first 5s quiet window after FCP
          if (metrics.fcp !== null) {
            metrics.tti = findFirstQuietWindow(metrics.longTasks, metrics.fcp);
            
            if (metrics.tti !== null) {
              let tbt = 0;
              for (const task of metrics.longTasks) {
                if (task.startTime >= metrics.fcp && task.endTime <= metrics.tti) {
                  const blockingTime = task.duration - 50;
                  if (blockingTime > 0) {
                    tbt += blockingTime;
                    console.log('Task contributing to TBT:', {
                      taskStartTime: task.startTime,
                      taskDuration: task.duration,
                      blockingTime,
                      runningTBT: tbt
                    });
                  }
                }
              }
              metrics.tbt = tbt;
            }
          }

          return metrics;
        };
      });

      console.log('Navigating to page...');
      await this.page.goto(this.config.url, {
        waitUntil: 'networkidle',
        timeout: this.config.waitTimeout
      });

      console.log('Waiting for metrics collection...');
      await this.page.waitForTimeout(15000);

      const metrics = await this.page.evaluate(() => {
        return window._performanceMetrics.calculateMetrics();
      });
      
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
      lcp: metrics.lcp ? parseFloat(metrics.lcp.toFixed(4)) : null,
      fcp: metrics.fcp ? parseFloat(metrics.fcp.toFixed(4)) : null,
      ttfb: metrics.ttfb ? parseFloat(metrics.ttfb.toFixed(4)) : null,
      tti: metrics.tti ? parseFloat(metrics.tti.toFixed(4)) : null,
      tbt: metrics.tbt ? parseFloat(metrics.tbt.toFixed(4)) : null
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
    console.log(`Starting ${runs} test run(s)...`);
    
    for (let i = 0; i < runs; i++) {
      this.currentRun = i;
      console.log(`Run ${i + 1}/${runs}`);
      await this.runTest();
    }

    await this.saveResults();
    console.log('====== Testing completed ======');
  }
}

// Usage
const tester = new PerformanceTester({
  url: 'http://localhost:8080',
  folder: 'core-web-vitals'
});

tester.run(1).catch(console.error);