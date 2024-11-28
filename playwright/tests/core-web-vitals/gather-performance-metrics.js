const gatherPerformanceMetrics = () => {
  return new Promise(resolve => {
    const metrics = {
      lcp: null,    
      fcp: null,    
      ttfb: null,   
      tti: null,    
      tbt: null,   
      longTasks: [],
      longestTask: null,
      quietWindowStart: null
    };

    const observers = [];
    
    const QUIET_WINDOW = 5_000;
    let quietWindowTimer;

    const TIMEOUT = 15_000;
    let timeoutTimer;

    const cleanupAndReturnMetrics = () => {
      console.log('Processing metrics..');
      
      if (quietWindowTimer) clearTimeout(quietWindowTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);

      metrics.tbt = 0;

      if (metrics.fcp !== null) {
        metrics.longTasks.forEach(task => {
          // TTI
          if(!metrics.tti || metrics.tti < task.endTime){
            metrics.tti = task.endTime;
          }

          // TBT
          if(task.startTime >= metrics.fcp.startTime){
            const blockingTime = task.duration - 50;
            if (blockingTime > 0) metrics.tbt += blockingTime;
          }

          // LONGESTTASK
          if(!metrics.longestTask || task.duration > metrics.longestTask.duration) metrics.longestTask = task;
        });

        metrics.tti ??= metrics.fcp.endTime;
      }

      metrics.longTasks = metrics.longTasks.length;

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
  
        if (!!metrics.fcp) {
          startQuietWindowTimer();
        }
      });
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
    observers.push(longTaskObserver);
      

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries.at(-1);

      if(!!lastEntry) {
        const newLCP = {
          startTime: lastEntry.startTime,
          duration: lastEntry.duration,
          endTime: lastEntry.startTime + lastEntry.duration
        };
        if ( !metrics.lcp || metrics.lcp.duration < newLCP.duration ){
          metrics.lcp = newLCP;
        }
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.push(lcpObserver);
    

    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const entry = entries.find(entry => entry.name === 'first-contentful-paint');

      if(!!entry) {
        metrics.fcp = {
          startTime: entry.startTime,
          duration: entry.duration,
          endTime: entry.startTime + entry.duration
        };
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