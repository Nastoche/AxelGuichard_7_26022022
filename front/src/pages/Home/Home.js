import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../components/Home/Comments";
import Posts from "../../components/Home/Posts";
import UploadPost from "../../components/Home/UploadPost";
import Navbar from "../../components/Navigation/Navbar";

const Home = () => {
  document.title = `Groupomania - Accueil`;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      <div className="container-bloc">
        <UploadPost />
        <Posts />
        <Comments />
      </div>
    </>
  );
};

export default Home;
