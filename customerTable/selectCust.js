const mysql = require('mysql');

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // Replace with your MySQL username
  password: '',    // Replace with your MySQL password
  database: 'mydatabase'  // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL.');

  // SQL query to select all records from the "customers" table
  const selectSql = 'SELECT * FROM customers';

  // Execute the select query
  connection.query(selectSql, (err, records) => {
    if (err) throw err;

    // Display all records in the console
    console.log('All records in the customers table:', records);

    // Specify the ID of the record to delete
    const customerIdToDelete = 1;  // Change this ID to the one you want to delete

    // SQL query to delete a specified record from the "customers" table
    const deleteSql = 'DELETE FROM customers WHERE id = ?';

    // Execute the delete query
    connection.query(deleteSql, [customerIdToDelete], (err, result) => {
      if (err) throw err;

      // Display the result of the delete operation
      console.log(`Deleted record with ID ${customerIdToDelete}. Number of records affected:`, result.affectedRows);

      // Execute the select query again to display remaining records
      connection.query(selectSql, (err, remainingRecords) => {
        if (err) throw err;

        // Display remaining records in the console
        console.log('Remaining records in the customers table:', remainingRecords);

        // Close the connection
        connection.end();
      });
    });
  });
});
