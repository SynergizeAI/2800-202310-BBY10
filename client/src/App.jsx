import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="profile" element={<Profile />} />
       <Route path="login" element={<Login />} />
       <Route path="signup" element={<Signup />} />
     </Routes>
   </div>
 );
};
 
export default App;