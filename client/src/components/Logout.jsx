import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    // Clear any saved data related to the user (e.g., local storage, cookies, or state)
    onLogout();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;