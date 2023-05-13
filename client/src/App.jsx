import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Logout, { withSetLoggedIn } from "./components/Logout";
import JoinChatSpaceForm from "./components/chatSpaces/JoinChatSpaceForm";
import ChatSpace from "./components/chatSpaces/ChatSpace";
import CreateChatSpaceForm from "./components/chatSpaces/CreateChatSpaceForm";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Define the checkLoggedIn function here
  const checkLoggedIn = async () => {
    const response = await fetch("https://jellyfish-app-g2qxa.ondigitalocean.app/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  // Call checkLoggedIn whenever App is rendered
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const WrappedLogout = withSetLoggedIn(Logout, setLoggedIn);

  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<WrappedLogout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="joinchat" element={<JoinChatSpaceForm />} />
        <Route path="space/:id" element={<ChatSpace />} />
        <Route path="createspace" element={<CreateChatSpaceForm />} />
      </Routes>
    </div>
  );
};

export default App;
