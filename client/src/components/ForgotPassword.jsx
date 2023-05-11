import React, { useState } from 'react';

function ForgotPassword({ onCancel }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the backend to initiate the password reset process
    console.log(`Reset password for email: ${email}`);
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ForgotPassword;