import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profil from "./pages/Profil/Profil";
import Trendings from "./pages/Trendings/Trendings";
import React from "react";
import Cgu from "./pages/CGU/Cgu";
import Post from "./pages/Home/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trendings" element={<Trendings />} />
        <Route path="/cgu" element={<Cgu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
