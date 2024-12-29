import http from 'k6/http';

export const options = {
  scenarios: {
    constant_unique_users: {
      executor: 'constant-arrival-rate',
      rate: 5000,
      timeUnit: '1m',    
      duration: '21m',    
      preAllocatedVUs: 0, 
      maxVUs: 1000,         
    },
  },
  discardResponseBodies: false,
};

export default () => {
  const response = http.get('http://localhost:8080/home');
}
