// Import Express
const express = require('express');
const app = express();

app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Pass the request to the next middleware or route
});

let todos = [
  { id: 1, task: 'Buy groceries' },
  { id: 2, task: 'Clean the house' }
];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, task: req.body.task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
