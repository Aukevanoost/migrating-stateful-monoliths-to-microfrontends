import * as fs from 'fs';
import { promisify } from 'util';


const writeFileAsync = promisify(fs.writeFile);

async function saveMetricsToCSV(pathToDir, results) {
  function formatDateTime(dt) {
    const hours = dt.getHours().toString().padStart(2, "0");
    const minutes = dt.getMinutes().toString().padStart(2, "0");
    const seconds = dt.getSeconds().toString().padStart(2, "0");

    return {
      date: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`,
      time: `${hours}:${minutes}:${seconds}`,
    };
  }

  function convertToCSV(data) {
    const headers = [
      "site",
      "date",
      "time",
      "navTime",
      "totalTime",
      "lcp",
      "fcp",
      "ttfb",
      "tbt",
      "longTasks",
      "longestTask",
      "error",
    ];

    const rows = data.map((run) => {
      const metrics = run.metrics || {};
      const { date, time } = formatDateTime(run.timestamp);
      return [
        run.site,
        date,
        time,
        run?.navToPageInMS ?? -1,
        run?.testTotalTimeInMS ?? -1,
        metrics?.lcp?.endTime ?? -1,
        metrics?.fcp?.endTime ?? -1,
        metrics?.ttfb || -1,
        metrics?.tbt || -1,
        metrics?.longTasks || -1,
        metrics?.longestTask.duration || -1,
        run.error || "",
      ]
        .map((value) => `"${value}"`)
        .join(",");
    });

    return [headers.join(","), ...rows].join("\n");
  }

  try {
    if (!fs.existsSync(pathToDir)) {
      fs.mkdirSync(pathToDir, { recursive: true });
    }
    const pathToFile = `${pathToDir}/${new Date().toISOString()}_results.csv`;

    await writeFileAsync(pathToFile, convertToCSV(results));
    console.log(`Results saved to ${pathToFile}`);
  } catch (error) {
    console.error("Error saving results:", error);
  }
}

export { saveMetricsToCSV }
