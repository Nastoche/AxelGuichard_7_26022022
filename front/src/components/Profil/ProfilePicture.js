import React from "react";

const ProfilePicture = ({ isUserProfil }) => {
  const handleUploadPic = () => {};
  return (
    <>
      <img
        className="user-infos-img"
        src="../img/default-contact-img.png"
        alt="profil"
      />
      {isUserProfil && (
        <button className="user-infos-btn" onClick={handleUploadPic}>
          Modifier 📷
        </button>
      )}
    </>
  );
};

export default ProfilePicture;
