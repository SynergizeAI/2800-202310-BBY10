import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import ForgotPassword from './ForgotPassword';

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
      {showForgotPassword ? (
        <ForgotPassword onCancel={handleCancelForgotPassword} />
      ) : isLoggedIn ? (
        <Logout onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
      )}
    </>
  );
}

export default App;