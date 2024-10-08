const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',       // Replace with your MySQL host
    user: 'root',            // Replace with your MySQL username
    password: '',            // Replace with your MySQL password
    database: 'mydatabase'   // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL.');
});

// Endpoint to insert a new employee
app.post('/add-employee', (req, res) => {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
        return res.status(400).json({
            message: 'Please provide id, name, and email.'
        });
    }

    const sql = 'INSERT INTO employee (id, name, email) VALUES (?, ?, ?)';
    
    connection.query(sql, [id, name, email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Database query failed',
                details: err
            });
        }

        // Respond with the inserted data
        return res.status(201).json({
            message: 'Employee added successfully!',
            data: { id, name, email }
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//node insertEmp.js

// Set the request type to POST.
// Enter the URL: http://localhost:3000/add-employee
// {
//     "id": 1,
//     "name": "John Doe",
//     "email": "john@example.com"
// }


