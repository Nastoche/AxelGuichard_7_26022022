import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProfile = ({ id }) => {
  const [handleDelete, setHandleDelete] = useState(false);
  const [handleDeactivate, setHandleDeactivate] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password !== controlPassword) {
      setErrors({
        ...errors,
        passwordConfirm: "Les mots de passe ne sont pas identiques",
      });
    } else {
      setErrors({});
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}api/user/${id}/password`,
        withCredentials: true,
        data: {
          user_password: currentPassword,
          newPassword: password,
        },
      })
        .then((res) => {
          console.log("mot de passe changé");
        })
        .catch((err) => {
          setErrors({
            ...errors,
            currentPassword: err.response.data.message,
          });
        });
    }
  };

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

  const handleDeactivateAccount = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/auth/deactivateAccount/${id}`,
      withCredentials: true,
      data: {
        user_id: id,
      },
    })
      .then((res) => {
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProfile = () => {
    setHandleDelete(true);
  };

  const handleDeactivateProfile = () => {
    setHandleDeactivate(true);
  };

  return (
    <>
      <h3>Paramètre du profil</h3>
      <div className="delete-user-profil">
        <div className="delete-user-profil__container">
          <button
            className="delete-user-profil__btn"
            onClick={() => setIsChangingPass(true)}
          >
            Changer de mot de passe
          </button>
          {!isChangingPass ? (
            <p>
              Nous vous conseillons d’utiliser un mot de passe sûr que vous
              n’utilisez nulle part ailleurs
            </p>
          ) : (
            <div className="form-container">
              <form action="" onSubmit={handleChangePassword}>
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <p>{errors.currentPassword}</p>
                <br />

                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="newPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <label htmlFor="newPasswordConfirm">Confirmation</label>
                <input
                  type="password"
                  name="password"
                  id="newPasswordConfirm"
                  value={controlPassword}
                  onChange={(e) => setControlPassword(e.target.value)}
                />
                <br />
                <p className="form-container-error">{errors.passwordConfirm}</p>
                <input
                  type="submit"
                  value="Enregistrer les modifications"
                  className="form-btn"
                />
                <button
                  className="form-btn"
                  onClick={() => setIsChangingPass(false)}
                >
                  Annuler
                </button>
              </form>
            </div>
          )}
        </div>
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
      {handleDeactivate && (
        <div className="deleteMessage">
          <div className="deleteMessageBox">
            <p>Voulez-vous vraiment désactiver votre compte ?</p>
            <div className="deleteBtn">
              <button onClick={handleDeactivateAccount}>Oui</button>
              <button onClick={() => setHandleDeactivate(false)}>Non</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProfile;
