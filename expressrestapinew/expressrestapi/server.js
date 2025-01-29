// Import the Express module
const express = require('express');
const app = express();
const port = 3000;

// Sample user data (in-memory database)
let users = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com' },
  { id: 2, name: 'Demo User', email: 'demouser@example.com' }
];
// Middleware to parse incoming JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Express REST API');
});
// POST: Create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
	console.log(name);
	console.log(email);
  // Validate input data
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Generate a unique ID for the new user
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
    email
  };

  // Add the new user to the in-memory database
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', newUser });
});
// GET: Retrieve all users
app.get('/api/users', (req, res) => {
    res.json(users);
});
// GET: Retrieve a user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Validate if userId is numeric
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  // Find the user by ID
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});
// PUT: Update existing user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Validate if userId is numeric
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's details with the provided data
  users[userIndex] = {
    ...users[userIndex],
    name: req.body.name || users[userIndex].name,
    email: req.body.email || users[userIndex].email
  };

  res.json({ message: 'User updated successfully', user: users[userIndex] });
});
// DELETE: Remove a user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Validate if userId is numeric
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove the user from the array
  users.splice(userIndex, 1);

  res.json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
