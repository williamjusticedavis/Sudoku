import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse-bg">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center space-y-8 text-white">
        <h1 className="text-4xl font-bold">Welcome to the Sudoku Dashboard!</h1>
        <p className="text-xl">Choose an option to get started:</p>

        <div className="space-y-6">
          {/* Daily Game */}
          <Link to="/daily-game">
            <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full text-lg shadow-lg transition duration-300">
              Daily Game
            </button>
          </Link>

          {/* Regular Game with Difficulty Selection */}
          <Link to="/regular-game">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full text-lg shadow-lg transition duration-300">
              Regular Game (Select Difficulty)
            </button>
          </Link>

          {/* Stats */}
          <Link to="/stats">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-full text-lg shadow-lg transition duration-300">
              View Stats
            </button>
          </Link>

          {/* Leaderboard */}
          <Link to="/leaderboard">
            <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-full text-lg shadow-lg transition duration-300">
              Leaderboard
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;