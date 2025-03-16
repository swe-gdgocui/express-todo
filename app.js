// Import Express
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Pass the request to the next middleware or route
});

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json({
    message: 'Todos retrieved',
    todos,
  });
});

// Create a new todo
app.post('/todos', async (req, res) => {
  const newTodo = { 
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
  };

  if (!newTodo.title) {
    return res.status(400).json({ error: 'Title is required' });
  }


  const todo = await prisma.todo.create({
    data: {
      title: newTodo.title,
      completed: newTodo.completed,
      description: newTodo.description,
    }
  });

  res.status(201).json({
    message: 'Todo created',
    todo
  });
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    }
  });

  res.json({
    message: 'Todo updated',
    todo,
  });
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) }
  });

  res.json({ message: 'Todo deleted' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
