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

// Endpoint to search for an employee by email
app.get('/employee', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({
            message: 'Please provide an email address to search.'
        });
    }

    const sql = 'SELECT * FROM employee WHERE email = ?';
    
    connection.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'Database query failed',
                details: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: `No employee found with email: ${email}`
            });
        }

        // Respond with the employee data
        return res.status(200).json({
            message: 'Employee found',
            data: result[0]
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//node searchEmp.js
// http://localhost:3000/employee?email=john@example.com.