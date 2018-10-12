import http from 'k6/http';
import { check } from 'k6';

const randomId = Math.floor(Math.random() * 100) + 10000000;

export let options = {
  vus: 200,
  duration: '30s'
  // rps: 1000
  // thresholds: {
  //   errors: ['rate<0.01']
  // }
};

export default function() {
  let res = http.get(`http://localhost:3003/api/v1/artists/${randomId}/popular-songs`);
  // console.log('Response time was ' + String(res.timings.duration) + ' ms');
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time was ok': r => r.timings.duration < 600
  });
}
