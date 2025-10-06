import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Railway provides PORT environment variable
const PORT = process.env.PORT || 3000;

console.log(`Server will start on port: ${PORT}`);
console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`__dirname: ${__dirname}`);

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint (Railway may check this)
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Root health check
app.get('/healthz', (req, res) => {
  console.log('Healthz check requested');
  res.status(200).send('OK');
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  fallthrough: true,
  index: false
}));

// Handle React Router - send all other requests to index.html
app.get('*', (req, res) => {
  console.log(`Serving index.html for: ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error serving application');
    }
  });
});

// Start server with error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server accepting connections at http://0.0.0.0:${PORT}`);
  console.log(`Process ID: ${process.pid}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});