import React from 'react';

const NumbersPanel = ({ onNumberClick, onErase }) => {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="w-14 h-14 md:w-16 md:h-16 bg-gray-200 hover:bg-blue-300 text-lg md:text-xl font-bold rounded-md shadow-md"
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={onErase}
        className="w-14 h-14 md:w-16 md:h-16 bg-red-400 hover:bg-red-500 text-white font-bold rounded-md shadow-md mt-4"
      >
        Erase
      </button>
    </div>
  );
};

export default NumbersPanel;
