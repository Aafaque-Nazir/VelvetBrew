import http from 'http';
import https from 'https';

const TARGET_URL = 'http://localhost:3000'; // Make sure your dev server is running
const PATH = '/'; // Testing homepage render performance
const CONCURRENT_USERS = 50;
const DURATION_MS = 10000; // 10 seconds

const stats = {
  requests: 0,
  success: 0,
  errors: 0,
  latencies: []
};

function makeRequest() {
  return new Promise((resolve) => {
    const start = Date.now();
    const client = TARGET_URL.startsWith('https') ? https : http;
    
    const req = client.get(TARGET_URL + PATH, (res) => { // Hit the products API
      let data = '';
      res.on('data', () => {});
      res.on('end', () => {
        const latency = Date.now() - start;
        stats.latencies.push(latency);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          stats.success++;
        } else {
          stats.errors++;
        }
        stats.requests++;
        resolve();
      });
    });

    req.on('error', (e) => {
      stats.errors++;
      stats.requests++;
      resolve();
    });
    
    req.end();
  });
}

async function simulateUser(endTime) {
  while (Date.now() < endTime) {
    await makeRequest();
    // small sleep to not kill localhost completely if it's single threaded
    await new Promise(r => setTimeout(r, 50)); 
  }
}

async function runLoadTest() {
  console.log(`Starting load test on ${TARGET_URL} with ${CONCURRENT_USERS} users for ${DURATION_MS}ms...`);
  
  const endTime = Date.now() + DURATION_MS;
  const workers = [];

  for (let i = 0; i < CONCURRENT_USERS; i++) {
    workers.push(simulateUser(endTime));
  }

  await Promise.all(workers);

  console.log('\n--- Load Test Results ---');
  console.log(`Total Requests: ${stats.requests}`);
  console.log(`Successful: ${stats.success}`);
  console.log(`Errors: ${stats.errors}`);
  
  if (stats.latencies.length > 0) {
    const avg = stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length;
    const sorted = [...stats.latencies].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    
    console.log(`Avg Latency: ${avg.toFixed(2)}ms`);
    console.log(`P95 Latency: ${p95}ms`);
  }
}

runLoadTest();
