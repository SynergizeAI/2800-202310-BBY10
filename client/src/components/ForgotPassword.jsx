import React, { useState } from 'react';

function ForgotPassword({ onCancel }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to initiate the password reset process
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      console.log(email);
      if (response.ok) {
        // Show a success message or do any other action you need
        console.log('Password reset email sent');
        alert('Password reset email sent!');
      } else {
        // Show an error message or do any other action you need
        console.log('Error sending password reset email');
        alert('Error sending password reset email.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
