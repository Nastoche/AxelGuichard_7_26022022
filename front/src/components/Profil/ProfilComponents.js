import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilComponents = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const navigate = useNavigate();

  const handleDescription = () => {};

  const handleUploadPic = () => {};

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const userInfo = JSON.parse(localStorage.getItem("user_info")).user;
    setUserFirstName(userInfo.user_firstname);
    setUserLastName(userInfo.user_lastname);
  }, []);
  // console.log(userInfo);

  return (
    <>
      <div className="container-bloc">
        <div className="user-infos">
          <img
            className="user-infos-img"
            src="./img/default-contact-img.png"
            alt="profil"
          />
          <button className="user-infos-btn" onClick={handleUploadPic}>
            Modifier ✏️
          </button>
          <h4 className="user-infos-name">
            {userFirstName} {userLastName}
          </h4>
          <hr />
          <p className="user-infos-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam,
            optio error? Aspernatur, minus voluptate nulla ratione animi
            pariatur cum maxime rem molestiae laboriosam doloribus aperiam quod
            hic odio quasi voluptas nisi explicabo.
          </p>
          <button className="user-infos-btn" onClick={handleDescription}>
            Modifier ✏️
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilComponents;
