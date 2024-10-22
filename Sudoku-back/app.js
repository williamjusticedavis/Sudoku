require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  // Import routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic route to test the server
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// Use user routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});