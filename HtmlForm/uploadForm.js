const http = require('http');

// Create an HTTP server
http.createServer((req, res) => {
    // Set the response header to return HTML content
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // HTML form with a file upload field
    const htmlForm = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Upload Form</title>
        </head>
        <body>
            <h1>File Upload Form</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <label for="file">Choose a file:</label>
                <input type="file" id="file" name="file"><br><br>
                <input type="submit" value="Upload">
            </form>
        </body>
        </html> `;

    // Send the form as the response
    res.end(htmlForm);
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
