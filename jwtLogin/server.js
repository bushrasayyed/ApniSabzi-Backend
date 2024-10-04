const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock user data (usually you'd have this in your database)
const users = [
    {
        id: 1,
        username: 'user1',
        password: bcrypt.hashSync('password1', 8) // Password is hashed using bcrypt
    },
    {
        id: 2,
        username: 'user2',
        password: bcrypt.hashSync('password2', 8)
    }
];

// Login API to authenticate user and generate JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({
            message: 'Please provide username and password.'
        });
    }

    // Find the user in the mock database
    const user = users.find(u => u.username === username);

    // If user is not found
    if (!user) {
        return res.status(401).json({
            message: 'Authentication failed. User not found.'
        });
    }

    // Check if password matches (using bcrypt)
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Authentication failed. Wrong password.'
        });
    }

    // Create JWT token
    const token = jwt.sign(
        { id: user.id, username: user.username }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Token expiry time
    );

    // Respond with the token
    return res.status(200).json({
        message: 'Login successful!',
        token: token
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//node server.js
//http://localhost:3000/login
// Pass this JSON body 
// {
//     "username": "user1",
//     "password": "password1"
// }
