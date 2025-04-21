const bcrypt = require('bcryptjs');

const users = []; // In-memory user store

// Add a new user
function addUser(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
}

// Find a user by username
function findUser(username) {
    return users.find(user => user.username === username);
}

// Validate user credentials
function validateUser(username, password) {
    const user = findUser(username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return true;
    }
    return false;
}

module.exports = { addUser, findUser, validateUser };