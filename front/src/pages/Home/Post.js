import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OnePost from "../../components/Home/OnePost";
import Navbar from "../../components/Navigation/Navbar";

const Post = () => {
  document.title = `Groupomania - Sujet`;

  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchOnePost = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        setPost(res.data[0]);
        // console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(checkUserId);
    fetchOnePost(id);
    console.log(post);
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-bloc">
        <OnePost
          post={post}
          isAdmin={isAdmin}
          userId={userId}
          fetchOnePost={fetchOnePost}
        />
      </div>
    </>
  );
};

export default Post;
