const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample users data (In a real application, use a database)
const users = [];

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }

    // Add the new user to the users array
    users.push({ username, password });

    // Respond with success
    return res.status(201).json({
        message: 'User registered successfully',
        user: {
            username
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



//http://localhost:3000/register -post request 
// {
//     "username": "user1",
//     "password": "password1"
// }

