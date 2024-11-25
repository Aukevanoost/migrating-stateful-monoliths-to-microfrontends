const puppeteer = require('puppeteer');

async function measureWebVitals(url, iterations = 3) {
  const metrics = [];
  
  console.log(`Testing ${url} for Core Web Vitals...`);
  
  for (let i = 0; i < iterations; i++) {
    console.log(`\nIteration ${i + 1}/${iterations}`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      await page.setCacheEnabled(false);
      const client = await page.target().createCDPSession();
      await client.send('Performance.enable');
      
      await client.send('PerformanceObserver.enable');
      
      const navigationStart = Date.now();
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      const performanceMetrics = await client.send('Performance.getMetrics');
      const navigationEnd = Date.now();
      
      const lcpElement = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              resolve(entries[entries.length - 1].startTime);
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          setTimeout(() => resolve(null), 5000);
        });
      });
      
      const fid = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length > 0) {
              resolve(entries[0].duration);
            }
          }).observe({ entryTypes: ['first-input'] });
          
          setTimeout(() => resolve(null), 5000);
        });
      });
      
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          }).observe({ entryTypes: ['layout-shift'] });
          
          setTimeout(() => resolve(clsValue), 5000);
        });
      });
      
      metrics.push({
        lcp: lcpElement,
        fid,
        cls,
        ttfb: performanceMetrics.metrics.find(m => m.name === 'FirstMeaningfulPaint').value,
        loadTime: navigationEnd - navigationStart
      });
      
    } finally {
      await browser.close();
    }
  }
  
  const averageMetrics = {
    lcp: average(metrics.map(m => m.lcp)),
    fid: average(metrics.map(m => m.fid)),
    cls: average(metrics.map(m => m.cls)),
    ttfb: average(metrics.map(m => m.ttfb)),
    loadTime: average(metrics.map(m => m.loadTime))
  };
  
  return {
    individualRuns: metrics,
    averages: averageMetrics,
    assessment: assessPerformance(averageMetrics)
  };
}

function average(arr) {
  const validValues = arr.filter(val => val !== null);
  return validValues.length ? 
    validValues.reduce((a, b) => a + b, 0) / validValues.length : 
    null;
}

function assessPerformance(metrics) {
  return {
    lcp: {
      score: metrics.lcp < 2500 ? 'Good' : metrics.lcp < 4000 ? 'Needs Improvement' : 'Poor',
      value: metrics.lcp
    },
    fid: {
      score: metrics.fid < 100 ? 'Good' : metrics.fid < 300 ? 'Needs Improvement' : 'Poor',
      value: metrics.fid
    },
    cls: {
      score: metrics.cls < 0.1 ? 'Good' : metrics.cls < 0.25 ? 'Needs Improvement' : 'Poor',
      value: metrics.cls
    },
    ttfb: {
      score: metrics.ttfb < 600 ? 'Good' : metrics.ttfb < 1000 ? 'Needs Improvement' : 'Poor',
      value: metrics.ttfb
    }
  };
}

async function runTest() {
    try {
        const results = await measureWebVitals('http://localhost:8080', 3);
        
        console.log('\n=== Core Web Vitals Test Results ===\n');
        
        console.log('Average Metrics:');
        Object.entries(results.averages).forEach(([metric, value]) => {
            console.log(`${metric}: ${value?.toFixed(2) || 'N/A'}`);
        });
        
        console.log('\nPerformance Assessment:');
        Object.entries(results.assessment).forEach(([metric, data]) => {
            console.log(`${metric}: ${data.score} (${data.value?.toFixed(2) || 'N/A'})`);
        });
        
        const fs = require('fs');
        fs.writeFileSync(
            'test-results.json',
            JSON.stringify(results, null, 2)
        );
        console.log('\nDetailed results saved to test-results.json');
        
    } catch (error) {
        console.error('Error running tests:', error);
        process.exit(1);
    }
}

module.exports = { measureWebVitals, runTest };