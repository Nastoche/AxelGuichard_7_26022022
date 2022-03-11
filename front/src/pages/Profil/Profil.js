import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import ProfilComponents from "../../components/Profil/ProfilComponents";

const Profil = () => {
  document.title = `Groupomania - Mon Profil`;
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }

    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    if (admin === 1) {
      setIsAdmin(true);
    }
  });
  return (
    <>
      <Navbar />
      <ProfilComponents isAdmin={isAdmin} />
    </>
  );
};

export default Profil;
