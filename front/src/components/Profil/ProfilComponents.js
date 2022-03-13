import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Description from "./Description";

const ProfilComponents = ({
  userFirstName,
  userLastName,
  isAdmin,
  fetchProfilById,
  id,
  isUserProfil,
  description,
}) => {
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
          <Description
            isUserProfil={isUserProfil}
            description={description}
            id={id}
            userFirstName={userFirstName}
            userLastName={userLastName}
            fetchProfilById={fetchProfilById}
          />
        </div>
      </div>
    </>
  );
};

export default ProfilComponents;
