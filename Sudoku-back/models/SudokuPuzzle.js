const mongoose = require('mongoose');

const sudokuPuzzleSchema = new mongoose.Schema({
  puzzleGrid: {
    type: [[Number]],
    required: true
  },
  solutionGrid: {
    type: [[Number]],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  dateAssigned: {
    type: Date,
    default: null
  },
  isDailyPool: {
    type: Boolean,
    default: false  // Regular puzzles default to false, daily puzzles will have this as true
  }
});

// TTL index on `dateAssigned` to auto-delete puzzles after 24 hours
sudokuPuzzleSchema.index({ dateAssigned: 1 }, { expireAfterSeconds: 86400 });

const SudokuPuzzle = mongoose.model('SudokuPuzzle', sudokuPuzzleSchema);

module.exports = SudokuPuzzle;