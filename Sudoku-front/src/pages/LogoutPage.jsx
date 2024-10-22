import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
        navigate('/');
      } catch (error) {
        console.error('Error logging out', error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-gray-100">
        <h2 className="text-2xl font-bold">Logging you out...</h2>
      </main>
      <Footer />
    </div>
  );
};

export default LogoutPage;