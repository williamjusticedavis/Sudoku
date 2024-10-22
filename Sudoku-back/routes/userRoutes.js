const express = require('express');
const router = express.Router();
const { createUser } = require('../controller/userController');

// Route to create a user
router.post('/create-user', createUser);

module.exports = router;