import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OnePost from "../../components/Post/OnePost";
import Navbar from "../../components/Navigation/Navbar";

const Post = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [post, setPost] = useState([]);
  const [localUserId, setLocalUserId] = useState("");
  const { id } = useParams();
  document.title = `Groupomania - Sujet de ${post.user_firstname} ${post.user_lastname}`;

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
    setLocalUserId(checkUserId);
    fetchOnePost(id);
  }, []);
  return (
    <>
      <Navbar isAdmin={isAdmin} localUserId={localUserId} />
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
