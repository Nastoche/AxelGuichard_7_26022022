import React from "react";
import OnePost from "../../components/Home/OnePost";
import Navbar from "../../components/Navigation/Navbar";

const Post = () => {
  return (
    <>
      <Navbar />
      <div className="container-bloc">
        <OnePost />
      </div>
    </>
  );
};

export default Post;
