import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  // Make this better
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch("https://jellyfish-app-g2qxa.ondigitalocean.app/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        navigate("/profile");
      }
    };
    checkLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Send email and password to server for user creation
      const response = await fetch("https://jellyfish-app-g2qxa.ondigitalocean.app/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        // alert('User created successfully.');
        await fetch("https://jellyfish-app-g2qxa.ondigitalocean.app/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        navigate("/profile");
      } else {
        alert("Error creating user. Please try again.");
        console.log(response);
      }
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
