import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse-bg">
      <Header />

      <main className="flex-grow flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold mb-8 text-yellow-300 animate-fade-in">Welcome to Sudoku!</h1>
        <p className="text-xl mb-6 text-yellow-200">Get started by logging in or signing up.</p>

        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-full text-lg transition duration-300 ease-in-out shadow-lg">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg transition duration-300 ease-in-out shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;