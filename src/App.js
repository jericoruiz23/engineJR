import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home/home";
import Login from "./Views/Login/login";
import SignUp from "./Views/SignUp/signUp";
import Dashboard from "./Views/Dashboard/dashboard";
import Documents from "./Views/Documents/documents";
import Storage from './Views/AllDocuments/allDocuments'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dataLoader" element={<Storage />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;
