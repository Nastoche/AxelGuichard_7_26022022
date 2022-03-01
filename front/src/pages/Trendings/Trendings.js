import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";

const Trendings = () => {
  document.title = `Groupomania - Populaires`;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
    }
  });
  return (
    <>
      <Navbar />
      <div className="container-bloc">
        <div>trendings</div>
      </div>
    </>
  );
};

export default Trendings;
