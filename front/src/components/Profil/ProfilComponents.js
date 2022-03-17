import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProfil from "./DeleteProfil";
import Description from "./Description";
import ProfilePicture from "./ProfilePicture";

const ProfilComponents = ({
  userFirstName,
  userLastName,
  isProfilAdmin,
  fetchProfilById,
  id,
  isUserProfil,
  description,
}) => {
  useLayoutEffect(() => {
    fetchProfilById(id);
  });

  return (
    <>
      <div className="container-bloc">
        <div className="user-infos">
          <ProfilePicture isUserProfil={isUserProfil} />

          <h4 className="user-infos-name">
            {userFirstName} {userLastName}
          </h4>
          {isProfilAdmin && <p>Administrateur</p>}
          {!isProfilAdmin && <p>{`Employé(e)`}</p>}

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
        <div className="delete-user">
          <DeleteProfil />
        </div>
      </div>
    </>
  );
};

export default ProfilComponents;
