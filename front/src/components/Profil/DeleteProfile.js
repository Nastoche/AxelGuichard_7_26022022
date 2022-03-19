import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProfile = ({ id }) => {
  const [handleDelete, setHandleDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/auth/deleteAccount/${id}`,
      withCredentials: true,
      data: {
        userId: id,
      },
    })
      .then((res) => {
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeactivateProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/auth/deactivateAccount/${id}`,
      withCredentials: true,
      data: {
        user_id: id,
      },
    })
      .then((res) => {
        console.log("Compte désactivé");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProfile = () => {
    setHandleDelete(true);
  };

  return (
    <>
      <h3>Paramètre du profil</h3>
      <div className="delete-user-profil">
        <div className="delete-user-profil__container">
          <button
            className="delete-user-profil__btn"
            onClick={handleDeactivateProfile}
          >
            Désactiver le compte
          </button>
          <h4>Ceci peut être temporaire</h4>
          <p>
            Votre compte sera désactivé, votre nom et vos photos seront
            supprimés de la plupart des contenus que vous avez partagés.
          </p>
          <p>
            Vous pouvez réactiver votre compte à tout moment en envoyant votre
            demande à un administrateur.
          </p>
        </div>
        <div className="delete-user-profil__container">
          <button
            className="delete-user-profil__btn"
            onClick={handleDeleteProfile}
          >
            Supprimer votre compte
          </button>
          <h4>Cette action est définitive.</h4>
          <p>
            Lorsque vous supprimez votre compte Groupomania, vous ne pouvez plus
            en récupérer le contenu ou les informations que vous avez partagées.
          </p>
        </div>
      </div>
      {handleDelete && (
        <div className="deleteMessage">
          <div className="deleteMessageBox">
            <p>Voulez-vous vraiment supprimer définitivement votre compte ?</p>
            <div className="deleteBtn">
              <button onClick={handleDeleteAccount}>Oui</button>
              <button onClick={() => setHandleDelete(false)}>Non</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProfile;
