/**
 * Simple Token Bucket Rate Limiter
 * 
 * Note: For a serverless environment (like Vercel), this in-memory cache 
 * will reset on every cold start. For robust production usage, 
 * consider using Redis (e.g., Upstash).
 */
const rateLimit = new Map();

export function checkRateLimit(ip) {
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 60; // Limit each IP to 60 requests per windowMs

  const user = rateLimit.get(ip) || { count: 0, startTime: Date.now() };
  const now = Date.now();

  if (now - user.startTime > windowMs) {
    // Reset window
    user.count = 1;
    user.startTime = now;
  } else {
    user.count++;
  }

  rateLimit.set(ip, user);

  if (user.count > maxRequests) {
    return false; // Rate limit exceeded
  }
  
  return true; // OK
}
