import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../components/Home/Comments";
import Posts from "../../components/Home/Posts";
import UploadPost from "../../components/Home/UploadPost";
import Navbar from "../../components/Navigation/Navbar";
import axios from "axios";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  document.title = `Groupomania - Accueil`;
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
    }
  });

  const fetchAllPosts = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setAllPosts(res.data);
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
    setUserId(checkUserId);
    fetchAllPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-bloc">
        <UploadPost fetchAllPosts={fetchAllPosts} userId={userId} />
        <Posts
          allPosts={allPosts}
          userId={userId}
          fetchAllPosts={fetchAllPosts}
        />
        <Comments />
      </div>
    </>
  );
};

export default Home;
