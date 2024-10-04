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
    host: 'localhost',      // Replace with your MySQL host
    user: 'root',           // Replace with your MySQL username
    password: '',           // Replace with your MySQL password
    database: 'mydatabase'  // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL.');
});

// Endpoint to list all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employee'; // Adjust table name as necessary

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Respond with the employee data
        return res.status(200).json({
            message: 'List of employees',
            data: results
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
