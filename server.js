// Iport Express
const express = require('express');
const fs = require('fs');

// Creates an Express app
const app = express();

// Set the port number
const PORT = 5000;


function readUsersFile(callback) {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(data)); 
        }
    });
}

// Home route 
app.get('/', (req, res) => {
    res.send('Welcome to the User API'); 
});

// Route to get all users

app.get('/users', (req, res) => {
    readUsersFile((err, users) => {
        if (err) {
            return res.status(500).send('Error reading data'); 
        }
        res.json(users); 
    });
});

// Route to get a user by their ID 

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); 
    readUsersFile((err, users) => {
        if (err) {
            return res.status(500).send('Error reading data'); 
        }
        const user = Object.values(users).find(user => user.id === userId); 
        if (user) {
            res.json(user); 
        } else {
            res.status(404).send('User not found'); 
        }
    });
});

// Route to get users by profession 

app.get('/users/profession/:profession', (req, res) => {
    const profession = req.params.profession.toLowerCase(); 
    readUsersFile((err, users) => {
        if (err) {
            return res.status(500).send('Error reading data'); 
        }
        const filteredUsers = Object.values(users).filter(user => user.profession.toLowerCase() === profession); 
        if (filteredUsers.length > 0) {
            res.json(filteredUsers); 
        } else {
            res.status(404).send('No users found with this profession');
        }
    });
});

// Route to get a user by name

app.get('/users/name/:name', (req, res) => {
    const name = req.params.name.toLowerCase(); 
    readUsersFile((err, users) => {
        if (err) {
            return res.status(500).send('Error reading data'); 
        }
        const user = Object.values(users).find(user => user.name.toLowerCase() === name); 
        if (user) {
            res.json(user); 
        } else {
            res.status(404).send('User not found'); 
        }
    });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
