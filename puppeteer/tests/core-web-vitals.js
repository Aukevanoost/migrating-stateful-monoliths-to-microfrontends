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

    async collectMetrics() {
        return this.page.evaluate(async () => {
            return new Promise((resolve) => {
                const metrics = {
                    lcp: null,
                    fcp: null,
                    ttfb: null
                };

                function checkComplete() {
                    if (metrics.lcp !== null && metrics.fcp !== null && metrics.ttfb !== null) {
                        resolve(metrics);
                    }
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

                const navigation = performance.getEntriesByType('navigation')[0];
                metrics.ttfb = navigation?.responseStart;
                checkComplete();
            });
        });
    }

    formatMetrics(metrics) {
        return Object.entries(metrics).reduce((acc, [key, value]) => {
            acc[key] = value ? parseFloat(value.toFixed(4)) : null;
            return acc;
        }, {});
    }

    formatDateTime(date) {
        // Format date as YYYY-MM-DD for easy sorting and filtering
        const formattedDate = date.toISOString().split('T')[0];
        
        // Format time as HH:mm:ss for 24-hour time
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return { date: formattedDate, time: formattedTime };
    }

    async cleanup() {
        if (this.page) await this.page.close().catch(console.error);
        if (this.context) await this.context.close().catch(console.error);
        if (this.browser) await this.browser.close().catch(console.error);
    }

    convertToCSV(data) {
        // Define CSV headers with separate date and time columns
        const headers = ['site', 'date', 'time', 'lcp', 'fcp', 'ttfb', 'error'];
        
        // Create CSV rows
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
                entry.error || ''
            ].map(value => `"${value}"`).join(',');
        });

        // Combine headers and rows
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

    async runTest() {
        try {
            await this.initBrowser();
            this.setupLogging();

            await this.page.goto(this.config.url, {
                waitUntil: 'networkidle',
                timeout: this.config.waitTimeout
            });

            const metrics = await this.collectMetrics();
            
            this.performanceData.push({
                site: this.config.url,
                timestamp: new Date(), // Store full Date object for formatting
                metrics: this.formatMetrics(metrics)
            });

        } catch (error) {
            console.error('Test run error:', error);
            this.performanceData.push({
                site: this.config.url,
                timestamp: new Date(), // Store full Date object for formatting
                error: error.message
            });
        } finally {
            await this.cleanup();
        }
    }

    async run(runs = 5) {
        console.log(`Starting ${runs} test run(s)...`);
        
        for (let i = 0; i < runs; i++) {
            console.log(`Run ${i + 1}/${runs}`);
            await this.runTest();
        }

        await this.saveResults();
        console.log('=== Testing completed ===');
    }
}

// Usage
const tester = new PerformanceTester({
    url: 'http://localhost:8080',
    folder: 'core-web-vitals'
});

tester.run(50).catch(console.error);