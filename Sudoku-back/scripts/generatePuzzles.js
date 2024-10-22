const mongoose = require('mongoose');
const sudoku = require('sudoku');  // Assuming you're using the 'sudoku' library
const SudokuPuzzle = require('../models/SudokuPuzzle');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to generate and save puzzles
const generatePuzzles = async (difficulty, numPuzzles, isDailyPool = false) => {
  for (let i = 0; i < numPuzzles; i++) {
    const puzzleString = sudoku.makepuzzle();  // Generate a puzzle
    const solutionString = sudoku.solvepuzzle(puzzleString);  // Generate its solution

    // Convert puzzle and solution strings into 9x9 grids
    const puzzleGrid = parsePuzzleGrid(puzzleString);
    const solutionGrid = parsePuzzleGrid(solutionString);

    // Create a new Sudoku puzzle document
    const newPuzzle = new SudokuPuzzle({
      puzzleGrid,
      solutionGrid,
      difficulty,
      dateAssigned: null,  // No date assigned initially
      isDailyPool  // Set to true for daily puzzles, false for regular puzzles
    });

    try {
      await newPuzzle.save();  // Save the puzzle to the database
      console.log(`Generated puzzle #${i + 1} - Difficulty: ${difficulty}`);
    } catch (error) {
      console.error('Error saving puzzle:', error.message);
    }
  }
};

// Function to parse the puzzle/solution into a 9x9 grid
const parsePuzzleGrid = (gridArray) => {
  const grid = [];
  for (let i = 0; i < gridArray.length; i += 9) {
    grid.push(gridArray.slice(i, i + 9).map(num => num === null ? 0 : num));  // Convert null to 0
  }
  return grid;
};

// Generate 100 puzzles for each difficulty level
const generateAllPuzzles = async () => {
  // Generate 100 puzzles for easy, medium, and hard difficulties
  await generatePuzzles('easy', 100);
  await generatePuzzles('medium', 100);
  await generatePuzzles('hard', 100);

  // Generate 20 additional hard puzzles for daily use (isDailyPool = true)
  await generatePuzzles('hard', 20, true);

  mongoose.disconnect();  // Close MongoDB connection when done
};

generateAllPuzzles();