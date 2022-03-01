import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllPosts from "../../components/Home/AllPosts";
import UploadPost from "../../components/Home/UploadPost";
import Navbar from "../../components/Navigation/Navbar";

const Home = () => {
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
        {useEffect(() => {
          if (!localStorage.getItem("user_info")) {
            navigate("/login");
          }
          <AllPosts />;
        })}
      </div>
    </>
  );
};

export default Home;
