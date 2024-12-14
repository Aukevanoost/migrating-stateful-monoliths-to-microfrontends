import * as fs from 'fs';
import { promisify } from 'util';


const writeFileAsync = promisify(fs.writeFile);

async function saveMetricsToCSV(pathToDir, metrics) {

  function formatDateTime(dt) {
    const hours = dt.getHours().toString().padStart(2, "0");
    const minutes = dt.getMinutes().toString().padStart(2, "0");
    const seconds = dt.getSeconds().toString().padStart(2, "0");

    return {
      date: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  }

  function processResults(data) {
    const headers = [
      "idx",
      "site",
      "date",
      "time",
      "navTime",
      "totalTime",
      "lcp",
      "fcp",
      "ttfb",
      "tbt",
      "tti",
      "longTasks",
      "longestTask",
      "nf:init",
      "nf:config",
      "nf:loaded",
      "error",
    ];

    const rows = data.map((run) => {
      const metrics = run.metrics || {};
      const { date, time } = formatDateTime(run.timestamp);
      return [
        run.idx,
        run.site,
        date,
        time,
        run?.navToPageInMS ?? -1,
        run?.testTotalTimeInMS ?? -1,
        metrics?.lcp?.endTime ?? -1,
        metrics?.fcp ?? -1,
        metrics?.ttfb || -1,
        metrics?.tbt || 0,
        metrics?.tti || -1,
        metrics?.longTasks.length || 0,
        metrics?.longestTask?.duration || -1,
        (metrics?.nfEvents ?? {})["nf:init"]?.startTime ?? -1,
        (metrics?.nfEvents ?? {})["nf:config"]?.startTime ?? -1,
        (metrics?.nfEvents ?? {})["nf:loaded"]?.startTime ?? -1,
        run.error || "",
      ]
        .map((value) => `"${value}"`)
        .join(",");
    });

    return [headers.join(","), ...rows].join("\n");
  }

  function processDetailed(data) {
    const headers = [
      "idx",
      "site",
      "date",
      "time",
      "type",
      "start",
      "end",
      "duration",
      "name",
      "element",
      "url",
      "id",
    ];

    const rows = [];
    data.forEach((run) => {

      const { date, time } = formatDateTime(run.timestamp);
      const LCP = [ 
        run.idx, run.site, date, time, "LCP",
        run.metrics.lcp.startTime, run.metrics.lcp.endTime, run.metrics.lcp.duration, 
        "-1", run.metrics.lcp.element, run.metrics.lcp.url, run.metrics.lcp.id
      ].map((value) => `"${value}"`).join(",");
      rows.push(LCP);

      run.metrics.longTasks.forEach(t => {
        const longTask = [
          run.idx, run.site, date, time, "longTask", 
          t.startTime, t.endTime, t.duration, t.name,
          "-1","-1","-1",
        ].map((value) => `"${value}"`).join(",");
        rows.push(longTask);
      });
    });

    return [headers.join(","), ...rows].join("\n");
  }

  try {
    if (!fs.existsSync(pathToDir)) {
      fs.mkdirSync(pathToDir, { recursive: true });
    }
    await writeFileAsync(
      `${pathToDir}/${new Date().toISOString()}_results.csv`, 
      processResults(metrics)
    );
    await writeFileAsync(
      `${pathToDir}/${new Date().toISOString()}_details.csv`, 
      processDetailed(metrics)
    );

    console.log(`Metrics saved!`);
  } catch (error) {
    console.error("Error saving results:", error);
  }
}

export { saveMetricsToCSV }
