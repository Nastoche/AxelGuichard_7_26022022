import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../components/Home/Comments";
import Posts from "../../components/Home/Posts";
import UploadPost from "../../components/Home/UploadPost";
import Navbar from "../../components/Navigation/Navbar";
import axios from "axios";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

  const navigate = useNavigate();

  document.title = `Groupomania - Accueil`;

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
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    setUserFirstName(
      JSON.parse(localStorage.getItem("user_info")).user.user_firstname
    );

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(checkUserId);
    fetchAllPosts();
  }, []);

  return (
    <>
      <Navbar localUserId={userId} isAdmin={isAdmin} />
      <div className="container-bloc">
        <UploadPost
          fetchAllPosts={fetchAllPosts}
          userId={userId}
          userFirstName={userFirstName}
        />
        <Posts
          allPosts={allPosts}
          userId={userId}
          fetchAllPosts={fetchAllPosts}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
};

export default Home;
