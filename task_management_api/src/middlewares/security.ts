import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { RequestHandler } from 'express';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
});

export const securityHeaders: RequestHandler = helmet();
