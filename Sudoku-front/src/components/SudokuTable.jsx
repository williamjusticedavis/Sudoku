import React from 'react';

const SudokuTable = ({ puzzle, initialPuzzle, solution, userEntries, activeCell, setActiveCell, highlightedNumber, setHighlightedNumber, markMode }) => {
  const handleCellClick = (rowIndex, colIndex) => {
    setActiveCell({ row: rowIndex, col: colIndex });
    const cellValue = userEntries[`${rowIndex}-${colIndex}`] || puzzle[rowIndex][colIndex];
    setHighlightedNumber(cellValue > 0 ? cellValue : null); // Set highlighted number if cell has a value
  };

  const isInSameBlock = (rowIndex, colIndex) => {
    if (activeCell.row === null || activeCell.col === null) return false;
    const blockRow = Math.floor(activeCell.row / 3);
    const blockCol = Math.floor(activeCell.col / 3);
    return (
      Math.floor(rowIndex / 3) === blockRow &&
      Math.floor(colIndex / 3) === blockCol
    );
  };

  const notePositions = {
    1: 'top-1 left-1',
    2: 'top-1 left-1/2 transform -translate-x-1/2',
    3: 'top-1 right-1',
    4: 'top-1/2 left-1 transform -translate-y-1/2',
    5: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    6: 'top-1/2 right-1 transform -translate-y-1/2',
    7: 'bottom-1 left-1',
    8: 'bottom-1 left-1/2 transform -translate-x-1/2',
    9: 'bottom-1 right-1',
  };

  const renderNotes = (cellKey) => {
    const notes = userEntries[cellKey] || new Set();
    return (
      <div className="absolute inset-0 grid text-xs pointer-events-none">
        {[...notes].map((note) => (
          <div
            key={note}
            className={`absolute ${notePositions[note]} ${
              note === highlightedNumber ? 'font-bold text-black' : 'text-gray-500'
            }`}
          >
            {note}
          </div>
        ))}
      </div>
    );
  };

  const renderGrid = () => {
    return (
      <div className="grid grid-cols-9 gap-0" style={{ width: 'fit-content', margin: 'auto' }}>
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`;
            const isActive = rowIndex === activeCell.row && colIndex === activeCell.col;
            const isEditable = initialPuzzle[rowIndex][colIndex] === 0;
            const userEntry = userEntries[cellKey];
            const isCorrect = userEntry === solution[rowIndex][colIndex];
            const cellContent = userEntry instanceof Set ? null : userEntry || (cell === 0 ? '' : cell);

            const isHighlightedNumber =
              highlightedNumber &&
              cellContent === highlightedNumber &&
              (cell === highlightedNumber || isCorrect);

            const isSameRow = activeCell.row !== null && rowIndex === activeCell.row;
            const isSameCol = activeCell.col !== null && colIndex === activeCell.col;
            const isInBlock = isInSameBlock(rowIndex, colIndex);

            const highlightColor = isActive
              ? 'bg-blue-300'
              : isHighlightedNumber
              ? 'bg-blue-400'
              : isSameRow || isSameCol || isInBlock
              ? 'bg-blue-100'
              : 'bg-white';

            const textColor = isEditable
              ? userEntry
                ? isCorrect
                  ? 'text-green-500'
                  : 'text-red-500'
                : 'text-blue-700'
              : 'text-black';

            return (
              <div
                key={cellKey}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer
                  ${highlightColor} ${textColor}
                  border border-gray-600
                  ${rowIndex % 3 === 0 && rowIndex !== 0 ? 'border-t-4' : 'border-t'} 
                  ${colIndex % 3 === 0 && colIndex !== 0 ? 'border-l-4' : 'border-l'} 
                  ${rowIndex === 8 ? 'border-b-4' : 'border-b'} 
                  ${colIndex === 8 ? 'border-r-4' : 'border-r'}
                `}
              >
                <span className="text-lg md:text-xl font-bold">{cellContent}</span>
                {userEntry instanceof Set && renderNotes(cellKey)}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return <div>{renderGrid()}</div>;
};

export default SudokuTable;