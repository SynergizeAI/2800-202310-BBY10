import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Add this line

  async function handleSubmit(e) {
    e.preventDefault();
    // send email and password to server for authentication
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // If login is successful, call onLogin
    // onLogin();
  };

  const handleForgotPassword = () => {
    console.log('forgot password');
    navigate('/forgot-password'); // Navigate to the ForgotPassword page
  };

  const handleNewUser = () => {
    console.log('New User');
    navigate('/signup');
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
        <button onClick={handleNewUser}>New User?</button>
        <br />
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      </div>
    </>
  );  
}

export default Login;