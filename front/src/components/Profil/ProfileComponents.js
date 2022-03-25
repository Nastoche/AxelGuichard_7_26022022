import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProfile from "./DeleteProfile";
import Description from "./Description";
import ProfilePicture from "./ProfilePicture";

const ProfileComponents = ({
  userFirstName,
  userLastName,
  isProfilAdmin,
  fetchProfilById,
  id,
  isUserProfil,
  description,
  getProfilePicture,
  imageUrl,
}) => {
  useLayoutEffect(() => {
    fetchProfilById(id);
    getProfilePicture(id);
  });

  return (
    <>
      <div className="container-bloc">
        <div className="user-infos">
          <ProfilePicture
            isUserProfil={isUserProfil}
            id={id}
            userFirstName={userFirstName}
            userLastName={userLastName}
            description={description}
            fetchProfilById={fetchProfilById}
            getProfilePicture={getProfilePicture}
            imageUrl={imageUrl}
          />

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
        {isUserProfil && (
          <div className="delete-user">
            <DeleteProfile id={id} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileComponents;
