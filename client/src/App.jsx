import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Logout, { withSetLoggedIn } from "./components/Logout";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const WrappedLogout = withSetLoggedIn(Logout, setLoggedIn);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<WrappedLogout />} />
      </Routes>
    </div>
  );
};

export default App;