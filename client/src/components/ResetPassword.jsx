import React, { useState } from 'react';

function ResetPassword({ token }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the backend to reset the password
    console.log(`Reset password with token: ${token} and new password: ${password}`);
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;