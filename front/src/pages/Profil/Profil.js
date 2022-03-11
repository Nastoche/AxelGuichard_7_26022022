import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import ProfilComponents from "../../components/Profil/ProfilComponents";

const Profil = () => {
  document.title = `Groupomania - Mon Profil`;
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

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
  }, []);
  return (
    <>
      <Navbar id={userId} />
      <ProfilComponents isAdmin={isAdmin} />
    </>
  );
};

export default Profil;
