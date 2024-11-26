const gatherPerformanceMetrics = () => {
  return new Promise(resolve => {
    const metrics = {
      lcp: null,    
      fcp: null,    
      ttfb: null,   
      tti: null,    
      tbt: null,   
      longTasks: [],
      quietWindowStart: null
    };

    const observers = [];
    
    const QUIET_WINDOW = 5000;
    let quietWindowTimer;

    const TIMEOUT = 15000;
    let timeoutTimer;

    const cleanupAndReturnMetrics = () => {
      console.log('Processing metrics..');
      
      if (quietWindowTimer) clearTimeout(quietWindowTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);

      metrics.tti ??= metrics.quietWindowStart;
      metrics.tti ??= metrics.fcp;

      if (metrics.tti !== null && metrics.fcp !== null) {
        metrics.tbt = metrics.longTasks.reduce((total, task) => {
          if (task.startTime >= metrics.fcp && task.endTime <= metrics.tti) {
            const blockingTime = task.duration - 50; 
            return blockingTime > 0 ? total + blockingTime : total;
          }
          return total;
        }, 0);
      }
      

      observers.forEach(observer => observer.disconnect());
      resolve(metrics);
    };

    const startQuietWindowTimer = () => {
      if (quietWindowTimer) {
        clearTimeout(quietWindowTimer);
      }
    
      quietWindowTimer = setTimeout(() => {
        metrics.quietWindowStart = Date.now();
        console.log('Quiet window reached');
        cleanupAndReturnMetrics();
      }, QUIET_WINDOW);
    };
    
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach(entry => {
        const task = {
          startTime: entry.startTime,
          duration: entry.duration,
          endTime: entry.startTime + entry.duration
        };
        
        metrics.longTasks.push(task);
        metrics.tti = task.endTime;
  
        if (metrics.fcp !== null) {
          startQuietWindowTimer();
        }
      });
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
    observers.push(longTaskObserver);
      
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries.at(-1);
  
      if (!metrics.lcp || lastEntry.startTime > metrics.lcp) {
        metrics.lcp = lastEntry.startTime;
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.push(lcpObserver);
    
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const paintEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      
      if (paintEntry && !metrics.fcp) {
        metrics.fcp = paintEntry.startTime;
        startQuietWindowTimer();
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
    observers.push(fcpObserver);
    
    const navEntry = performance.getEntriesByType('navigation')[0];
    if (navEntry) {
      metrics.ttfb = navEntry.responseStart;
    }

    timeoutTimer = setTimeout(() => {
      console.log('TIMEOUT REACHED');
      cleanupAndReturnMetrics();
    }, TIMEOUT);
  });
};

export { gatherPerformanceMetrics };