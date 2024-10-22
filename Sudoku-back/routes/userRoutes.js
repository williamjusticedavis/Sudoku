const express = require('express');
const router = express.Router();
const { createUser,loginUser,logoutUser } = require('../controller/userController');
const jwt = require('jsonwebtoken');
router.post('/create-user', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/verify-token', (req, res) => {
    const token = req.cookies.token;  // Get the token from cookies
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verify the token
      return res.status(200).json({ message: 'Token is valid', decoded });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });

module.exports = router;