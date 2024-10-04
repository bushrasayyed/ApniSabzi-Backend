const mysql = require('mysql');

// Create a connection to MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // Use your MySQL username
  password: '',    // Use your MySQL password
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server.');

  // Create a new database
  connection.query('CREATE DATABASE IF NOT EXISTS mydatabase', (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists.');

    // Switch to the newly created database
    connection.changeUser({ database: 'mydatabase' }, (err) => {
      if (err) throw err;

      // Create a new table in the database
      const createTableQuery = ` CREATE TABLE IF NOT EXISTS users (
          id INT ,name VARCHAR(255))`;
      connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table "users" created or already exists.');
        
        // Close the connection
        connection.end();
      });
    });
  });
});
