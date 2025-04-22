const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { addUser, findUser, validateUser } = require('./users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: 'hangman-secret',
    resave: false,
    saveUninitialized: true
}));

// Serve the login page
app.get('/login', (req, res) => {
    console.log('Serving login page'); // Debugging log
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Serve the registration page
app.get('/register', (req, res) => {
    console.log('Serving register page'); // Debugging log
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Serve the reginstration page
app.get('/login.html', (req, res) => {
    console.log('Serving game page'); // Debugging log
    if (!req.session.user) {
        console.log('User not authenticated, redirecting to login'); // Debugging log
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle registration
app.post('/register', (req, res) => {
    console.log('Registering user:', req.body.username); // Debugging log
    const { username, password } = req.body;
    if (findUser(username)) {
        return res.send('User already exists. <a href="/register">Try again</a>');
    }
    addUser(username, password);
    res.redirect('/login');
});

// Handle login
app.post('/login', (req, res) => {
    console.log('Logging in user:', req.body.username); // Debugging log
    const { username, password } = req.body;
    if (validateUser(username, password)) {
        req.session.user = username;
        return res.redirect('/');
    }
    res.send('Invalid credentials. <a href="/login">Try again</a>');
});

// Serve the game page (only if logged in)
app.get('/profile', (req, res) => {
    console.log('Session user:', req.session.user); // Debugging log
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login`);
});

