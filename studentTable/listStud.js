const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',        // MySQL host
    user: 'root',             // Your MySQL username
    password: '',             // Your MySQL password (keep it empty if no password is set)
    database: 'mydatabase'        // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

// GET API to list all students with marks greater than 60
app.get('/students/list', (req, res) => {
    const sql = 'SELECT * FROM student WHERE marks > 60';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching records: ', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found with marks greater than 60' });
        }

        // Success, return the list of students
        return res.status(200).json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//http://localhost:3000/students/list
