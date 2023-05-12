import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinChatSpaceForm() {
  const [code, setCode] = useState('');
  const navigate = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/spaces/join', { code });
      console.log(response.data._id)
      // Navigate to the chat space
      navigate(`/space/${response.data._id}`);
    } catch (error) {
      // handle error (e.g. display an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </label>
      <button type="submit">Join</button>
    </form>
  );
}

export default JoinChatSpaceForm;
