import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-gray-200 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <img 
          src="/Grid.png" 
          alt="Sudoku Logo" 
          className="w-12 h-12 cursor-pointer" 
          onClick={handleLogoClick} 
        />
        <h1 className="text-3xl font-bold text-center flex-grow text-blue-300">Sudoku Game</h1>
      </div>
    </header>
  );
};

export default Header;