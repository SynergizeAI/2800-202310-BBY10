import { useState } from 'react';

function Login({ onLogin, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    console.log('forgot password')
    // onForgotPassword();
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
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      </div>
    </>
  );
}

export default Login;