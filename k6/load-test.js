import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

const requestDuration = new Trend('duration');

export const options = {
  scenarios: {
    step_load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 500 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 1500 },
        { duration: '30s', target: 2000 },
        { duration: '30s', target: 2500 },
        { duration: '30s', target: 3000 },
        { duration: '30s', target: 3500 },
        { duration: '30s', target: 4000 },
        { duration: '30s', target: 4500 },
        { duration: '30s', target: 5000 },
        { duration: '30s', target: 5500 },
        { duration: '30s', target: 6000 }
      ],
    },
  },
  discardResponseBodies: true,
};

export default function () {
  const response = http.get('http://localhost:8080/', {
    tags: { type: 'homepage' }  
  });
  
  requestDuration.add(response.timings.duration);
  
  sleep(360000);
}