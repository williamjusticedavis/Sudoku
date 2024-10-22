import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login', 
        { email, password },
        { withCredentials: true }  // Include credentials (cookies)
      );
      setSuccess(response.data.message);
      setError('');
      navigate('/game'); // Redirect to game or dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
      setSuccess('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse-bg">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-lg p-10 space-y-6 bg-blue-100 shadow-2xl rounded-lg border border-gray-300 transform transition hover:scale-105">
          <h2 className="text-center text-3xl font-bold text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;