// server.js
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
      <head><title>Simple Server</title></head>
      <body>
        <h1>Welcome to My Node.js Server</h1>
        <p>This is a basic HTTP server running on port ${PORT}</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
