import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Task Tracker Frontend Server...');

const app = express();
const PORT = process.env.PORT || 3000;

console.log(`📡 PORT from environment: ${process.env.PORT}`);
console.log(`📁 Working directory: ${__dirname}`);

// Verify dist directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log(`📦 Static files ready: ${files.join(', ')}`);
} else {
  console.error('❌ Dist directory not found!');
  process.exit(1);
}

// Middleware for all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url} from ${req.ip || 'unknown'}`);
  next();
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.send('✅ Server is working! Task Tracker Frontend is ready.');
});

// Health endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', port: PORT, timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 Server running on 0.0.0.0:${PORT}`);
  console.log(`🌐 Ready to serve Task Tracker Frontend`);
});