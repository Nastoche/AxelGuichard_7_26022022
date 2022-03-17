import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AnyProfile from "./pages/Profil/AnyProfile";
import React from "react";
import Cgu from "./pages/CGU/Cgu";
import Post from "./pages/Home/Post";
import axios from "axios";
import Moderation from "./pages/Moderation/Moderation";

function App() {
  axios.interceptors.response.use(
    function (response) {
      // console.log(response);
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        localStorage.clear();
        window.location.href = "/login";
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moderation" element={<Moderation />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil/:id" element={<AnyProfile />} />
        <Route path="/cgu" element={<Cgu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
