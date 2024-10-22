const SudokuPuzzle = require('../models/SudokuPuzzle');

// Function to add a new Sudoku puzzle
exports.addSudokuPuzzle = async (req, res) => {
  const { puzzleGrid, solutionGrid, difficulty } = req.body;

  try {
    const newPuzzle = new SudokuPuzzle({ puzzleGrid, solutionGrid, difficulty });
    await newPuzzle.save();
    res.status(201).json({ message: 'Sudoku puzzle added successfully', puzzle: newPuzzle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding puzzle', error: error.message });
  }
};

exports.getDailyPuzzle = async (req, res) => {
    try {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));  // Set time to 00:00:00 for comparison
  
      // Check if there's a puzzle assigned in the last 24 hours
      const dailyPuzzle = await SudokuPuzzle.findOne({
        isDailyPool: true,
        dateAssigned: { $gte: new Date(now - 24 * 60 * 60 * 1000) }  // Last 24 hours
      });
  
      if (dailyPuzzle) {
        return res.status(200).json({ puzzle: dailyPuzzle });
      }
  
      // If no puzzle has been assigned for the last 24 hours, pick a new one
      const randomPuzzle = await SudokuPuzzle.aggregate([
        { $match: { isDailyPool: true, dateAssigned: null } },  // Only select from unassigned daily pool
        { $sample: { size: 1 } }  // Randomly pick one
      ]);
  
      // Handle the case where no puzzle is found
      if (!randomPuzzle.length) {
        return res.status(404).json({ message: 'No available puzzles to assign' });
      }
  
      const selectedPuzzle = randomPuzzle[0];
  
      // Assign the date to this puzzle and save
      const puzzleToAssign = await SudokuPuzzle.findById(selectedPuzzle._id);
      puzzleToAssign.dateAssigned = now;  // Assign current date
      await puzzleToAssign.save();
  
      res.status(200).json({ puzzle: puzzleToAssign });
    } catch (error) {
      console.error('Error retrieving daily puzzle:', error);
      res.status(500).json({ message: 'Error retrieving daily puzzle', error: error.message });
    }
  };