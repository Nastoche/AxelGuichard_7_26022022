import React from "react";

const DeleteProfil = () => {
  return (
    <>
      <h3>Paramètre du profil</h3>
      <div className="delete-user-profil">
        <div className="delete-user-profil__container">
          <button className="delete-user-profil__btn">
            Désactiver le compte
          </button>
          <h4>Ceci peut être temporaire</h4>
          <p>
            Votre compte sera désactivé, votre nom et vos photos seront
            supprimés de la plupart des contenus que vous avez partagés.
          </p>
          <p>Vous pouvez réactiver votre compte à tout moment.</p>
        </div>
        <div className="delete-user-profil__container">
          <button className="delete-user-profil__btn">
            Supprimer votre compte
          </button>
          <h4>Cette action est définitive.</h4>
          <p>
            Lorsque vous supprimez votre compte Groupomania, vous ne pouvez plus
            en récupérer le contenu ou les informations que vous avez partagées.
          </p>
        </div>
      </div>
    </>
  );
};

export default DeleteProfil;
