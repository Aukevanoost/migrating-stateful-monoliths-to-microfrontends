import * as playwright from 'playwright-chromium';

const getLongtaskObserver = (taskList) => {
    return new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {

          taskList.push({
            startTime: entry.startTime,
            duration: entry.duration,
            endTime: entry.startTime + entry.duration
          });
        }
      })
}