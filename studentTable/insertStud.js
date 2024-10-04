const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',        // MySQL host
    user: 'root',             // Your MySQL username
    password: '',             // Your MySQL password (keep it empty if no password is set)
    database: 'mydatabase'        // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});

// SQL query to insert multiple records into the student table
const sql = `INSERT INTO student (id, name, rollno, marks) VALUES ?`;

// Array of student data
const students = [
    [1, 'Rahul Sharma', 'S101', '85'],
    [2, 'Anjali Verma', 'S102', '92'],
    [3, 'Amitabh Gupta', 'S103', '78'],
    [4, 'Sanjana Iyer', 'S104', '88'],
    [5, 'Rohan Patil', 'S105', '91'],
];

// Insert multiple records into the table
connection.query(sql, [students], (err, result) => {
    if (err) {
        console.error('Error inserting records: ', err);
        return;
    }
    console.log('Number of records inserted: ', result.affectedRows);
    console.log('Result: ', result);
});

// Close the connection
connection.end();
