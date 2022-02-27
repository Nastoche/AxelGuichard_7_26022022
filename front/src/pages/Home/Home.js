import React from "react";
import AllPosts from "../../components/Home/AllPosts";
import UploadPost from "../../components/Home/UploadPost";
import Navbar from "../../components/Navigation/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-bloc">
        <UploadPost />
        <AllPosts />
      </div>
    </>
  );
};

export default Home;
