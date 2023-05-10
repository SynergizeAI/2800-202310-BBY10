import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import ForgotPassword from './ForgotPassword';
import Navbar from './components/navbar';
import RecordList from './components/recordList';
import Edit from './components/edit';
import Create from './components/create';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <Navbar />
      {showForgotPassword ? (
        <ForgotPassword onCancel={handleCancelForgotPassword} />
      ) : isLoggedIn ? (
        <>
          <Logout onLogout={handleLogout} />
          <Routes>
            <Route exact path="/" element={<RecordList />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
      )}
    </>
  );
}

export default App;