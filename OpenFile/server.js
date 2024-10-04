// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
http.createServer((req, res) => {
    // Get the file path based on the request URL
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Read the file from the file system
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, send 404 response
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404: File Not Found');
            } else {
                // Some server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500: Internal Server Error');
            }
        } else {
            // File was found, send the content
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
}).listen(5000, () => {
    console.log('Server running on port 5000');
});

//To run =>node server.js
//in url localhost:5000/index.html

