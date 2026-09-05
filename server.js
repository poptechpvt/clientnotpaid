const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Normalize url
  let reqUrl = req.url.split('?')[0];

  // If requesting config.js
  if (reqUrl === '/config.js') {
    const configPath = path.join(__dirname, 'config.js');
    fs.readFile(configPath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading configuration');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=UTF-8' });
      res.end(content);
    });
    return;
  }

  // Map to public directory
  let filePath = path.join(PUBLIC_DIR, reqUrl === '/' ? 'index.html' : reqUrl);

  // Security check: ensure path is within public dir
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA-like behavior or 404
      const fallbackPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(fallbackPath, (err2, fallbackContent) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(fallbackContent);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('=========================================');
  console.log(' Access Locked Landing Page Server Active');
  console.log(` URL: http://localhost:${PORT}`);
  console.log(' Status: Awaiting ₹6,999 settlement');
  console.log('=========================================');
});
