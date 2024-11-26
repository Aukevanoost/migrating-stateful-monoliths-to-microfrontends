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
      waitTimeout: config.waitTimeout || 10000
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
  }

  setupLogging() {
    this.page.on('console', msg => console.log(`Page log: ${msg.text()}`));
    this.page.on('pageerror', err => console.error(`Page error: ${err}`));
    this.page.on('requestfailed', req => console.error(`Failed request: ${req.url()}`));
  }
  
  async measureInteraction() {
    return this.page.evaluate(() => {
      return new Promise((resolve) => {
        try {
          const hideButton = document.querySelector('#hide-teasers');
          if (!hideButton) {
            console.error('Hide button not found');
            return resolve(null);
          }

          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            for (const entry of entries) {
              if (entry.entryType === 'measure' && entry.name === 'interactionDuration') {
                observer.disconnect(); 
                resolve(entry.duration);
              }
            }
          });

          observer.observe({ entryTypes: ['measure'] });

          performance.clearMarks();
          performance.clearMeasures();

          performance.mark('interactionStart');

          const handleClick = () => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                try {
                  performance.mark('interactionEnd');
                  performance.measure('interactionDuration', 'interactionStart', 'interactionEnd');
                } catch (error) {
                  console.error('Error during performance measurement:', error);
                  resolve(null);
                }
              });
            });
          };

          const newButton = hideButton.cloneNode(true);
          newButton.addEventListener('click', handleClick, { once: true });
          hideButton.parentNode.replaceChild(newButton, hideButton);

          newButton.click();

          setTimeout(() => {
            observer.disconnect();
            if (!performance.getEntriesByName('interactionDuration').length) {
              console.log('Measurement timed out');
              resolve(null);
            }
          }, 3000);

        } catch (error) {
          console.error('Error in measureInteraction:', error);
          resolve(null);
        }
    });
    }).catch(error => {
      console.error('Error in page.evaluate:', error);
      return null;
    });
  }

  async collectMetrics() {
    return this.page.evaluate(() => {
      return new Promise((resolve) => {
        const metrics = {
          lcp: null,
          fcp: null,
          ttfb: null,
          inp: null
        };

        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry) {
            metrics.ttfb = navEntry.responseStart;
        }

        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          metrics.lcp = entries.at(-1)?.startTime;
          checkComplete();
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        new PerformanceObserver((list) => {
          metrics.fcp = list.getEntries()[0]?.startTime;
          checkComplete();
        }).observe({ type: 'paint', buffered: true });

        function checkComplete() {
          if (metrics.lcp !== null && metrics.fcp !== null && metrics.ttfb !== null) {
            resolve(metrics);
          }
        }

        setTimeout(() => resolve(metrics), 5000);
      });
    });
  }

  async runTest() {
    try {
      await this.initBrowser();
      this.setupLogging();

      await this.page.goto(this.config.url, {
          waitUntil: 'networkidle',
          timeout: this.config.waitTimeout
      });

      const metrics = await this.collectMetrics();
      
      await this.page.waitForTimeout(1000);

      try {
        const hideButton = await this.page.$('#hide-teasers');
        if (hideButton) {
          await hideButton.waitForElementState('visible');
          
          const duration = await this.measureInteraction();
          if (duration !== null) {
            metrics.inp = duration;
          }
        }
          
        this.performanceData.push({
          site: `${this.config.url}/`,
          timestamp: new Date(),
          metrics: this.formatMetrics(metrics),
          run: this.currentRun + 1
        });
      } catch (e) {
        console.error('Interaction failed:', e.message);
        this.performanceData.push({
          site: this.config.url,
          timestamp: new Date(),
          error: e.message,
          run: this.currentRun + 1
        });
      }
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
    return Object.entries(metrics).reduce((acc, [key, value]) => {
      acc[key] = value && value !== -1 ? parseFloat(value.toFixed(4)) : null;
      return acc;
    }, {});
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
    const headers = ['site', 'date', 'time', 'lcp', 'fcp', 'ttfb', 'inp', 'error'];
    
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
        metrics.inp || '',
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