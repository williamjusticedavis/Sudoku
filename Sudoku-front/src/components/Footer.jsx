import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} <span className="text-blue-300">Sudoku Game</span>. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="hover:text-blue-300">About</a> | <a href="/contact" className="hover:text-blue-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;