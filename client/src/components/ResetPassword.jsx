import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const token = searchParams.get("token");

  console.log("Token from URL params:", token); // Use token instead of decodedToken

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to reset the password
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, newPassword: password }), // Include the token in the request body
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Password reset successful");
        navigate("/login");
      } else {
        const data = await response.json();
        console.error(data);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
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
