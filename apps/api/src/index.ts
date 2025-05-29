// Server
import { createServer, logger } from './server';

// Environment Variables
const environment = process.env.ENVIRONMENT || "DEVELOPMENT";
const port = process.env.PORT || 8080;

// Server
const app = createServer();

app.listen(port, () => {
  logger.info(`🚀 Server is running at http://localhost:${port} in ${environment} mode`);
});
