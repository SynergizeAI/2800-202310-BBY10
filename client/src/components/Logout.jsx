import React from 'react';

export function withSetLoggedIn(WrappedComponent, setLoggedIn) {
  return (props) => <WrappedComponent {...props} setLoggedIn={setLoggedIn} />;
}

function Logout({ setLoggedIn }) {
  const handleLogout = async () => {
    console.log("pressed button");
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    console.log('this is supposed to work if you are reading this');
      if (response.ok) {
        setLoggedIn(false);
        console.log('response shouldve worked if reading this');
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