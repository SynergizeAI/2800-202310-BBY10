import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateChatSpaceForm() {
  const [title, setTitle] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url;

    try {
      const response = await axios.post("/api/spaces/create", { title });

      console.log("Chat space created with ID:", response.data._id);
      url = `/space/${response.data._id}`;
      // redirect to the chat space we just created
    } catch (error) {
      // handle error (e.g. display an error message to the user)
    }
    navigate(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Create Chat Space</button>
    </form>
  );
}

export default CreateChatSpaceForm;
