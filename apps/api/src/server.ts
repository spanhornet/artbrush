// Express
import express, { Express, Request, Response, NextFunction } from 'express';

// CORS
import cors from 'cors';

// Pino
import pino from 'pino';
import pinoHttp from 'pino-http';

// Better-Auth
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';

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
  const ORIGIN = process.env.NODE_ENV === "production" ? "https://artbrush-app.onrender.com" : "http://localhost:3000";
  const corsMw = cors({
    origin: ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 60 * 60 * 24,
    optionsSuccessStatus: 204,
  });
  app.use(corsMw);

  // Better-Auth middleware
  app.all("/api/auth/*splat", toNodeHandler(auth));

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  app.use(pinoHttp({ logger }));

  // Mount routes
  app.use('/api/users', usersRouter);

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
};
