import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import ProfilComponents from "../../components/Profil/ProfilComponents";

const Profil = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("user_info")) {
  //     navigate("/login");
  //     return;
  //   }
  // });
  return (
    <>
      <Navbar />
      <ProfilComponents />
    </>
  );
};

export default Profil;
