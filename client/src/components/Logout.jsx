import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function withSetLoggedIn(WrappedComponent, setLoggedIn) {
  return (props) => <WrappedComponent {...props} setLoggedIn={setLoggedIn} />;
}

function Logout({ setLoggedIn }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setLoggedIn(false);
        navigate('/login');
      } else {
        console.log('Error logging out');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;