const express = require('express');
const { addSudokuPuzzle, getDailyPuzzle } = require('../controller/sudokuPuzzleController');
const router = express.Router();

// Route to add a new puzzle
router.post('/add-puzzle', addSudokuPuzzle);

// Route to get or assign the daily puzzle
router.get('/daily-puzzle', getDailyPuzzle);

module.exports = router;