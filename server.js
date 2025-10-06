import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Railway provides PORT environment variable
const PORT = process.env.PORT || 3000;

console.log(`Server will start on port: ${PORT}`);
console.log(`Environment PORT: ${process.env.PORT}`);
console.log(`__dirname: ${__dirname}`);

// Verify dist directory exists and has files
const distPath = path.join(__dirname, 'dist');
console.log(`Checking dist directory: ${distPath}`);
try {
  const distFiles = fs.readdirSync(distPath);
  console.log(`Dist files found: ${distFiles.join(', ')}`);
  
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('index.html found - ready to serve');
  } else {
    console.error('ERROR: index.html not found!');
  }
} catch (err) {
  console.error('ERROR: Cannot access dist directory:', err);
}

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// Simple test endpoint
app.get('/test', (req, res) => {
  console.log('Test endpoint requested');
  res.status(200).send('Server is working!');
});

// Health check endpoints - Railway checks these
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString(), port: PORT });
});

app.get('/healthz', (req, res) => {
  console.log('Healthz check requested');
  res.status(200).send('OK');
});

// Railway might check root path for health
app.get('/', (req, res) => {
  console.log('Root path requested - serving index.html');
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error serving application');
    }
  });
});

// Serve static files from the dist directory  
app.use(express.static(path.join(__dirname, 'dist'), {
  fallthrough: true,
  index: false
}));

// Handle React Router - send all other requests to index.html
app.get('*', (req, res) => {
  console.log(`Serving index.html for: ${req.url}`);
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error serving application');
    }
  });
});

// Start server with explicit binding for Railway
const HOST = '0.0.0.0';
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server is running on ${HOST}:${PORT}`);
  console.log(`✅ Server accepting connections at http://${HOST}:${PORT}`);
  console.log(`✅ Process ID: ${process.pid}`);
  console.log(`✅ Server ready to handle requests`);
  
  // Test server binding
  console.log(`✅ Server address: ${JSON.stringify(server.address())}`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});