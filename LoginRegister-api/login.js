const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample users data (In a real application, use a database)
const users = [
    { username: 'admin', password: 'pswd1' },
    { username: 'user', password: 'pswd2' }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.status(200).json({
            message: 'Login successful',
            user: {
                username: user.username
            }
        });
    } else {
        return res.status(401).json({
            message: 'Invalid username or password'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//http://localhost:3000/login
//JSON format
// {
//     "username": "admin",
//     "password": "password1"
// }
