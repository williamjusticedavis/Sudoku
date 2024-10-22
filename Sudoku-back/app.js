require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  // Import routes
const cookieParser = require('cookie-parser');  // Import cookie-parser
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Front-end origin
    credentials: true  // Allow credentials (cookies)
  }));
app.use(cookieParser());  // Middleware to handle cookies

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});