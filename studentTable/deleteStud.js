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
    password: '',             // Your MySQL password (keep empty if no password is set)
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

// DELETE API to delete student by rollno
app.delete('/student/:rollno', (req, res) => {
    const rollno = req.params.rollno;

    // SQL query to delete student by rollno
    const sql = 'DELETE FROM student WHERE rollno = ?';

    connection.query(sql, [rollno], (err, result) => {
        if (err) {
            console.error('Error deleting record: ', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            // No student found with the given rollno
            return res.status(404).json({ message: `No student found with rollno ${rollno}` });
        }

        // Success, student record deleted
        return res.status(200).json({ message: `Student with rollno ${rollno} deleted successfully` });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//node server.js
//http://localhost:3000/student/S101
