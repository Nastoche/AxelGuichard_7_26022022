import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";

const Trendings = () => {
  document.title = `Groupomania - Populaires`;
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

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
  }, []);
  return (
    <>
      <Navbar id={userId} />
      <div className="container-bloc">
        <div>trendings</div>
      </div>
    </>
  );
};

export default Trendings;
