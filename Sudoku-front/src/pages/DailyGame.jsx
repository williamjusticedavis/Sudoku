import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SudokuTable from '../components/SudokuTable';
import NumbersPanel from '../components/NumbersPanel';
import { FiLoader } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';

const DailyGame = () => {
  const [initialPuzzle, setInitialPuzzle] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userEntries, setUserEntries] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCell, setActiveCell] = useState({ row: null, col: null });
  const [highlightedNumber, setHighlightedNumber] = useState(null);
  const [markMode, setMarkMode] = useState(false); // Track mark mode

  useEffect(() => {
    const fetchDailyPuzzle = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sudoku/daily-puzzle');
        setInitialPuzzle(response.data.puzzle.puzzleGrid);
        setPuzzle(response.data.puzzle.puzzleGrid);
        setSolution(response.data.puzzle.solutionGrid);
        setLoading(false);
      } catch (err) {
        setError('Error fetching the daily puzzle');
        setLoading(false);
      }
    };
    fetchDailyPuzzle();
  }, []);

  const handleNumberClick = (number) => {
    if (activeCell.row !== null && activeCell.col !== null) {
      const isEditable = initialPuzzle[activeCell.row][activeCell.col] === 0;
      if (isEditable) {
        if (markMode) {
          // In mark mode, add number as a note in the active cell
          const cellKey = `${activeCell.row}-${activeCell.col}`;
          const updatedEntries = { ...userEntries };
          updatedEntries[cellKey] = updatedEntries[cellKey] || new Set();
          if (updatedEntries[cellKey].has(number)) {
            updatedEntries[cellKey].delete(number); // Toggle off note if already present
          } else {
            updatedEntries[cellKey].add(number); // Add note if not present
          }
          setUserEntries(updatedEntries);
        } else {
          // Normal entry mode: enter number as a regular entry
          const updatedEntries = { ...userEntries, [`${activeCell.row}-${activeCell.col}`]: number };
          setUserEntries(updatedEntries);
          if (number === solution[activeCell.row][activeCell.col]) {
            setHighlightedNumber(number);
          }
        }
      }
    }
  };

  const handleEraseClick = () => {
    if (activeCell.row !== null && activeCell.col !== null) {
      const entryKey = `${activeCell.row}-${activeCell.col}`;
      const deletedNumber = userEntries[entryKey];
      if (deletedNumber !== undefined) {
        const updatedEntries = { ...userEntries };
        delete updatedEntries[entryKey];
        setUserEntries(updatedEntries);
        if (deletedNumber === highlightedNumber) {
          setHighlightedNumber(null);
        }
      }
    }
  };

  if (loading) {
    return <FiLoader className="animate-spin text-4xl" />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <MdOutlineErrorOutline className="text-4xl" />
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center mt-6">
        <h1 className="text-4xl font-bold mb-6">Daily Sudoku Puzzle</h1>
        <div className="flex space-x-8">
          <SudokuTable
            puzzle={puzzle}
            initialPuzzle={initialPuzzle}
            solution={solution}
            userEntries={userEntries}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            highlightedNumber={highlightedNumber}
            setHighlightedNumber={setHighlightedNumber}
            markMode={markMode}
          />
          <div className="flex flex-col items-start">
            <NumbersPanel onNumberClick={handleNumberClick} onErase={handleEraseClick} />
            <button
              onClick={() => setMarkMode(!markMode)}
              className={`mt-4 px-4 py-2 rounded-md ${markMode ? 'bg-green-500' : 'bg-blue-500'} text-white font-bold`}
            >
              {markMode ? 'Mark Mode On' : 'Mark Mode Off'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailyGame;
