import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import { healthCheck, logger } from './middlewares/logger';
import { config } from './config';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);

// Health check endpoint
app.get('/health', healthCheck);

// Main API routes
app.use(routes);

// Error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
