import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainPage from './pages/MainPage';
import LogoutPage from './pages/LogoutPage';
import Dashboard from './pages/Dashboard';
import DailyGame from './pages/DailyGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<LogoutPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/daily-game" element={<DailyGame />}/>
      </Routes>
    </Router>
  );
}

export default App;