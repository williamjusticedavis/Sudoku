import React from 'react';
import { FaEraser } from 'react-icons/fa'; // Eraser icon

const NumbersPanel = ({ handleNumberClick, handleEraseClick, usedNumbers }) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Numbers Grid */}
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full text-white font-bold shadow-lg transition-all transform 
            ${usedNumbers[num] >= 9 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 hover:scale-105'}`}
            disabled={usedNumbers[num] >= 9}  // Disable if all 9 numbers are used
          >
            {num}
          </button>
        ))}
      </div>

      {/* Erase Button */}
      <button
        onClick={handleEraseClick}
        className="w-full h-16 md:h-20 rounded-full bg-red-500 text-white font-bold shadow-lg hover:bg-red-600 transition-all flex items-center justify-center space-x-2"
      >
        <FaEraser className="text-xl" /> {/* Eraser icon */}
        <span>Erase</span>
      </button>
    </div>
  );
};

export default NumbersPanel;