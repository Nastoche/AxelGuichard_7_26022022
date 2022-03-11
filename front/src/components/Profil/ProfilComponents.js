import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilComponents = ({
  userFirstName,
  userLastName,
  isAdmin,
  fetchProfilById,
  id,
  isUserProfil,
}) => {
  const handleDescription = () => {};

  const handleUploadPic = () => {};

  useLayoutEffect(() => {
    fetchProfilById(id);
  });

  return (
    <>
      <div className="container-bloc">
        <div className="user-infos">
          <img
            className="user-infos-img"
            src="../img/default-contact-img.png"
            alt="profil"
          />
          {isUserProfil && (
            <button className="user-infos-btn" onClick={handleUploadPic}>
              Modifier ✏️
            </button>
          )}

          <h4 className="user-infos-name">
            {userFirstName} {userLastName}
          </h4>
          {isAdmin && <p>Administrateur</p>}
          {!isAdmin && <p>{`Employé(e)`}</p>}

          <hr />
          <p className="user-infos-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam,
            optio error? Aspernatur, minus voluptate nulla ratione animi
            pariatur cum maxime rem molestiae laboriosam doloribus aperiam quod
            hic odio quasi voluptas nisi explicabo.
          </p>
          {isUserProfil && (
            <button className="user-infos-btn" onClick={handleDescription}>
              Modifier ✏️
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilComponents;
