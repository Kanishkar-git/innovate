const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Dummy user data
const users = [
  { id: 1, name: 'Alice Johnson', role: 'Admin' },
  { id: 2, name: 'Bob Smith', role: 'User' },
  { id: 3, name: 'Charlie Brown', role: 'Moderator' }
];

// 1. GET / - returns "Home Page"
app.get('/', (req, res) => {
  res.send('Home Page');
});

// 2. GET /about - returns "About Page"
app.get('/about', (req, res) => {
  res.send('About Page');
});

// 3. GET /users - returns an array of JSON users
app.get('/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`);
});
