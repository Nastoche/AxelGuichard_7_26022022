import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import Reports from "./Reports";

const Moderation = () => {
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    // setUserFirstName(
    //   JSON.parse(localStorage.getItem("user_info")).user.user_firstname
    // );

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(checkUserId);
  }, []);

  return (
    <>
      <Navbar isAdmin={isAdmin} localUserId={userId} />
      <div className="container-bloc">
        <Reports userId={userId} isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default Moderation;
