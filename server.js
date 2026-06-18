const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // Decode URL parameters (handling %20, etc.)
  let decodedUrl = decodeURIComponent(req.url);
  // Strip off query parameters or hashes
  const cleanUrl = decodedUrl.split('?')[0].split('#')[0];
  
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
  
  // Prevent directory traversal attacks
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  // Check if target is a directory, if so, append index.html
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Server error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log('==================================================');
  console.log('  AegisAI Local Server Started Successfully!');
  console.log(`  Access the application at: http://localhost:${PORT}`);
  console.log('  Press Ctrl+C to stop the server.');
  console.log('==================================================');
});
