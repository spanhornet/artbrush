import { createServer } from './server';

const port = 8080;
const app = createServer();

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
