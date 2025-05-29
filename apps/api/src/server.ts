// Express
import express, { Express, Request, Response, NextFunction } from 'express';

// CORS
import cors from 'cors';

// Pino
import pino from 'pino';
import pinoHttp from 'pino-http';

// Better-Auth
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

// Routes
import usersRouter from './routes/users.route';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

export const createServer = (): Express => {
  const app = express();

  // CORS middleware
  const corsMw = cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 60 * 60 * 24,
    optionsSuccessStatus: 204,
  });
  app.use(corsMw);
  app.options('*', corsMw);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Better-Auth middleware
  app.all('/api/auth/*', toNodeHandler(auth));

  // Logging middleware
  app.use(pinoHttp({ logger }));

  // Mount routes
  app.use('/users', usersRouter);

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
};
