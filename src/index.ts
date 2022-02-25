import express from 'express';
import routes from './routes/index';
import File from './utilities/file';

const port: number = 3000; // default port
const app = express();

// Add routes
app.use(routes);

// Start Server

app.listen(port, async (): Promise<void> => {
  await File.createThumbPath(); // checking if thumb path can be found
  const url: string = `http://localhost:${port}`;
  console.log(`Please open ${url} to access the project..`);
});

export default app;
