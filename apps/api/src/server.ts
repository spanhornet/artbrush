// Express
import express, { Express, Request, Response, NextFunction } from 'express';

// Pino
import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

export const createServer = (): Express => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  app.use(pinoHttp({ logger }));

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
};
