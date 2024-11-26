/**
 * Core Web Vitals Measurements:
 * 
 * TTFB (Time to First Byte):
 * - Time from navigation start until the first byte of response is received
 * - Calculated using: performance.getEntriesByType('navigation')[0].responseStart
 * 
 * FCP (First Contentful Paint):
 * - Time when the first text, image, or other content appears on the screen
 * - Measured using PerformanceObserver with type: 'paint'
 * - Looks for entries with name 'first-contentful-paint'
 * 
 * LCP (Largest Contentful Paint):
 * - Time when the largest text or image element is rendered on the screen
 * - Measured using PerformanceObserver with type: 'largest-contentful-paint'
 * - Updates when a larger element is rendered, final value is the largest
 * 
 * TTI (Time to Interactive):
 * - Time when the page becomes reliably interactive
 * - Calculated by finding the first 5-second window after FCP with no long tasks (>50ms)
 * - A long task is any uninterrupted period where the main thread is busy for 50ms or more
 * 
 * TBT (Total Blocking Time):
 * - Sum of all "blocking time" for long tasks between FCP and TTI
 * - Blocking time = (task duration - 50ms) for each long task
 * - Measured using PerformanceObserver with type: 'longtask'
*/

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
  
      console.log('Navigating to page...');
      await this.page.goto(this.config.url, {
        waitUntil: 'networkidle',
        timeout: this.config.waitTimeout
      });
  
      console.log('Setting up metrics collection...');
      const metrics = await this.page.evaluate(() => {
        return new Promise(resolve => {
          const performanceMetrics = {
            lcp: null,
            fcp: null,
            ttfb: null,
            tti: null,
            tbt: null,
            longTasks: []
          };
  
          // Long tasks observer
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            for (const entry of entries) {

              performanceMetrics.longTasks.push({
                startTime: entry.startTime,
                duration: entry.duration,
                endTime: entry.startTime + entry.duration
              });
            }
          }).observe({ type: 'longtask', buffered: true });
  
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries.at(-1);
  
            if (!performanceMetrics.lcp || lastEntry.startTime > performanceMetrics.lcp) {
              performanceMetrics.lcp = lastEntry.startTime;
            }
          }).observe({ type: 'largest-contentful-paint', buffered: true });
  
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const paintEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            
            if (paintEntry) {
              performanceMetrics.fcp = paintEntry.startTime;
            }
          }).observe({ type: 'paint', buffered: true });
  
          function findFirstQuietWindow(tasks, searchStart) {
            const QUIET_WINDOW = 5000;
            const MAX_TIME = performance.now();
            
            if (!tasks.length) return searchStart;
          
            tasks.sort((a, b) => a.startTime - b.startTime);

            const relevantTasks = tasks.filter(task => task.startTime >= searchStart);
            
            if (!relevantTasks.length) {
              return (MAX_TIME - searchStart >= QUIET_WINDOW) ? searchStart : null;
            }
          
            // Find the first quiet window
            let quietWindowStart = null;
            for (let i = 0; i < relevantTasks.length - 1; i++) {
              const currentTaskEnd = relevantTasks[i].endTime;
              const nextTaskStart = relevantTasks[i + 1].startTime;
              
              if (nextTaskStart - currentTaskEnd >= QUIET_WINDOW) {
                quietWindowStart = currentTaskEnd;
                break;
              }
            }
          
            if (!quietWindowStart) {
              const lastTaskEnd = relevantTasks[relevantTasks.length - 1].endTime;
              if (MAX_TIME - lastTaskEnd >= QUIET_WINDOW) {
                quietWindowStart = lastTaskEnd;
              }
            }
          
            if (!quietWindowStart) {
              return null;
            }
          
            const lastTaskBeforeQuiet = [...tasks]
              .reverse()
              .find(task => task.endTime <= quietWindowStart);
          
            return lastTaskBeforeQuiet ? lastTaskBeforeQuiet.endTime : searchStart;
          }
  
          const navEntry = performance.getEntriesByType('navigation')[0];
          if (navEntry) {
            performanceMetrics.ttfb = navEntry.responseStart;
          }
  
          setTimeout(() => {
            // Calculate TTI and TBT
            if (performanceMetrics.fcp !== null) {
              performanceMetrics.tti = findFirstQuietWindow(performanceMetrics.longTasks, performanceMetrics.fcp);
              
              if (performanceMetrics.tti !== null) {
                let tbt = 0;
                for (const task of performanceMetrics.longTasks) {
                  if (task.startTime >= performanceMetrics.fcp && task.endTime <= performanceMetrics.tti) {
                    const blockingTime = task.duration - 50;
                    if (blockingTime > 0) {
                      tbt += blockingTime;
                    }
                  }
                }
                performanceMetrics.tbt = tbt;
              }
            }
  
            resolve(performanceMetrics);
          }, 15000);
        });
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