// Server
import { createServer } from './server';

// Environment Variables
const environment = process.env.ENVIRONMENT || "DEVELOPMENT";
const port = process.env.PORT || 8080;
const app = createServer();

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port} in ${environment} mode`);
});
