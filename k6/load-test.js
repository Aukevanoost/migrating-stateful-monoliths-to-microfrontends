import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { sleep } from 'k6';

const requestDuration = new Trend('duration');

export const options = {
  scenarios: {
    constant_unique_users: {
      executor: 'constant-arrival-rate',
      rate: 5000,
      timeUnit: '30s',    
      duration: '11m',    
      preAllocatedVUs: 100, 
      maxVUs: 500,         
    },
  },
  discardResponseBodies: false,
};

export default () => {
  const response = http.get('http://localhost:8080/', { 
    tags: { type: 'homepage' }
  });
  requestDuration.add(response.timings.duration);
  sleep(2)
}