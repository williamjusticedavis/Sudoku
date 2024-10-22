import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NumbersPanel from '../components/NumbersPanel';  // Import NumbersPanel
import { FiLoader } from 'react-icons/fi'; // For loading spinner
import { MdOutlineErrorOutline } from 'react-icons/md'; // For error icon

const DailyGame = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);  // Solution grid from the database
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEntries, setUserEntries] = useState([]);  // Track user-entered numbers
  const [activeCell, setActiveCell] = useState({ row: null, col: null, value: null });  // Track the active cell
  const [usedNumbers, setUsedNumbers] = useState({});  // Track how many times each number is used

  useEffect(() => {
    // Fetch the daily puzzle from the backend
    const fetchDailyPuzzle = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sudoku/daily-puzzle');
        setPuzzle(response.data.puzzle.puzzleGrid);  // Set the puzzle grid from response
        setSolution(response.data.puzzle.solutionGrid);  // Set the solution grid from response
        setLoading(false);
        setUserEntries([]);  // Clear user entries on load
        setUsedNumbers(countUsedNumbers(response.data.puzzle.puzzleGrid));  // Count initial used numbers
      } catch (err) {
        setError('Error fetching the daily puzzle');
        setLoading(false);
      }
    };

    fetchDailyPuzzle();
  }, []);

  // Function to check if two cells are in the same 3x3 block
  const isInSameBlock = (rowIndex, colIndex) => {
    const blockRow = Math.floor(activeCell.row / 3);
    const blockCol = Math.floor(activeCell.col / 3);
    return (
      Math.floor(rowIndex / 3) === blockRow &&
      Math.floor(colIndex / 3) === blockCol
    );
  };

  // Function to determine the border class for each cell (for 3x3 grid appearance)
  const borderClass = (rowIndex, colIndex) => {
    let classes = 'border-gray-500';

    if (rowIndex % 3 === 0) classes += ' border-t-4';  // Top border for 3x3 grid
    if (colIndex % 3 === 0) classes += ' border-l-4';  // Left border for 3x3 grid

    return classes;
  };

  // Count how many times each number is used in the puzzle
  const countUsedNumbers = (grid) => {
    const count = {};
    for (let i = 1; i <= 9; i++) count[i] = 0;  // Initialize count for each number
    grid.forEach(row => row.forEach(cell => {
      if (cell > 0) count[cell]++;
    }));
    return count;
  };

  // Function to handle cell changes for empty squares
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newPuzzle = [...puzzle];
    const newValue = parseInt(value, 10);

    // Allow only numbers between 1 and 9, or allow clearing the cell (empty input)
    if ((newValue >= 1 && newValue <= 9) || value === '') {
      const prevValue = newPuzzle[rowIndex][colIndex];  // Track the previous value

      newPuzzle[rowIndex][colIndex] = value === '' ? 0 : newValue;  // Clear the cell if empty
      setPuzzle(newPuzzle);

      // Track user input changes
      const updatedUserEntries = [...userEntries];
      if (value === '') {
        updatedUserEntries[rowIndex * 9 + colIndex] = false;  // Remove the user entry when the cell is cleared
      } else {
        updatedUserEntries[rowIndex * 9 + colIndex] = true;  // Mark the cell as user-entered
      }
      setUserEntries(updatedUserEntries);

      // Update used numbers
      const newUsedNumbers = { ...usedNumbers };
      if (prevValue > 0) newUsedNumbers[prevValue]--;  // Decrease count for the previous value
      if (newValue > 0) newUsedNumbers[newValue]++;  // Increase count for the new value
      setUsedNumbers(newUsedNumbers);

      // Immediately check if the new value is correct
      if (newValue === solution[rowIndex][colIndex]) {
        setActiveCell({ row: rowIndex, col: colIndex, value: newValue });  // Set the active cell to trigger highlighting
      }
    }
  };

  // Handle number button click
  const handleNumberClick = (num) => {
    const { row, col } = activeCell;
    if (row !== null && col !== null) {
      handleCellChange(row, col, num);
    }
  };

  // Handle erase button click
  const handleEraseClick = () => {
    const { row, col } = activeCell;
    if (row !== null && col !== null) {
      handleCellChange(row, col, '');  // Clear the active cell
    }
  };

  // Function to render the Sudoku grid
  const renderGrid = () => {
    if (!puzzle || !solution) return null;  // Ensure both puzzle and solution are loaded

    return (
      <div className="grid grid-cols-9 gap-1">
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isCorrect = cell === solution[rowIndex][colIndex];  // Compare user entry with solution
            const isUserEntered = userEntries[rowIndex * 9 + colIndex];
            const isActiveCell = rowIndex === activeCell.row && colIndex === activeCell.col;
            const isSameNumber = activeCell.value && cell === activeCell.value;

            // Only highlight row, column, and block if an active cell exists
            const isActiveRow = activeCell.row !== null && rowIndex === activeCell.row;
            const isActiveCol = activeCell.col !== null && colIndex === activeCell.col;
            const isInBlock = activeCell.row !== null && isInSameBlock(rowIndex, colIndex);  // Check if it's in the same 3x3 block

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell === 0 ? '' : cell}  // Controlled value
                onChange={cell === 0 || isUserEntered ? (e) => handleCellChange(rowIndex, colIndex, e.target.value) : undefined}
                className={`w-12 h-12 md:w-16 md:h-16 text-center border 
                            ${borderClass(rowIndex, colIndex)} 
                            font-bold
                            ${isUserEntered ? (isCorrect ? 'text-green-500' : 'text-red-500') : 'text-black'}
                            ${
                              isActiveCell
                                ? 'bg-blue-500' // Darker blue for active cell
                                : isSameNumber
                                ? 'bg-yellow-300' // Highlight same numbers in yellow
                                : (isActiveRow || isActiveCol || isInBlock)
                                ? 'bg-blue-200' // Lighter blue for row, column, or 3x3 block
                                : 'bg-white' // White for non-active cells
                            }
                            focus:outline-none caret-transparent cursor-pointer`}  // Remove blinking caret
                maxLength={1}
                readOnly={cell !== 0 && !isUserEntered}  // Set readOnly for pre-filled cells and correct user-entered cells
                onFocus={() => setActiveCell({ row: rowIndex, col: colIndex, value: cell })}  // Set active cell on focus
                onBlur={(e) => e.preventDefault()}  // Prevent focus from being lost
              />
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold text-white mb-6">Daily Sudoku Puzzle</h1>
        <div className="flex space-x-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <FiLoader className="animate-spin text-white text-4xl mb-2" />
              <p className="text-white">Loading puzzle...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <MdOutlineErrorOutline className="text-red-500 text-4xl mb-2" />
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md">{renderGrid()}</div>
              <NumbersPanel
                handleNumberClick={handleNumberClick}
                handleEraseClick={handleEraseClick}
                usedNumbers={usedNumbers}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailyGame;