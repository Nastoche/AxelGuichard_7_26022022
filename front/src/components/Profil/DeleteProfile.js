import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteMyProfile from "./DeleteMyProfile";

const DeleteProfile = ({ id }) => {
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLetterOk, setIsLetterOk] = useState(false);
  const [isNumberOk, setIsNumberOk] = useState(false);
  const [isSpecialOk, setIsSpecialOk] = useState(false);
  const [isMinMaxOk, setIsMinMaxOk] = useState(false);

  const [passwordChanged, setPasswordChanged] = useState(false);

  // Regex password
  const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&éè])[A-Za-z\d@$!%*#?&éè]{8,32}$/; // Minimum 8 caractères, au moins une lettre, un chiffre et un caractère spécial
  const regexLetter = /[a-zA-Z]/g; // Check si le string contient au moins une lettre
  const regexNum = /\d/; // Check s'il y a un chiffre
  const regexSpecial = /[@$!%*#?&éè]/;
  const regexMinMax = /^.{8,32}$/; // Check si le mdp contient minimum 8 caractères et maximum 32

  const navigate = useNavigate();

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);

    if (regexLetter.test(e.target.value)) {
      setIsLetterOk(true);
    } else {
      setIsLetterOk(false);
    }
    if (regexNum.test(e.target.value)) {
      setIsNumberOk(true);
    } else {
      setIsNumberOk(false);
    }
    if (regexSpecial.test(e.target.value)) {
      setIsSpecialOk(true);
    } else {
      setIsSpecialOk(false);
    }
    if (regexMinMax.test(e.target.value)) {
      setIsMinMaxOk(true);
    } else {
      setIsMinMaxOk(false);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (
      password !== controlPassword ||
      !regexPassword.test(password) ||
      (!isLetterOk && !isNumberOk && !isSpecialOk && !isMinMaxOk)
    ) {
      if (password !== controlPassword) {
        setErrors({
          ...errors,
          passwordConfirm: "Les mots de passe ne sont pas identiques",
        });
      } else {
        setErrors({ ...errors, passwordConfirm: "" });
      }
      if (currentPassword) return;
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
          setPasswordChanged(true);
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
                <p className="form-container-error">{errors.currentPassword}</p>
                <br />

                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="newPassword"
                  value={password}
                  onChange={handlePasswordInput}
                />
                <div className="password-container">
                  <ul>
                    <li className={isLetterOk ? "password-ok" : "password-not"}>
                      Une lettre
                    </li>
                    <li className={isNumberOk ? "password-ok" : "password-not"}>
                      Un chiffre
                    </li>
                    <li
                      className={isSpecialOk ? "password-ok" : "password-not"}
                    >
                      Un caractère spécial
                    </li>
                    <li className={isMinMaxOk ? "password-ok" : "password-not"}>
                      8-32 caractères
                    </li>
                  </ul>
                </div>

                <label htmlFor="newPasswordConfirm">Confirmation</label>
                <input
                  type="password"
                  name="password"
                  id="newPasswordConfirm"
                  value={controlPassword}
                  onChange={(e) => setControlPassword(e.target.value)}
                />
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
        <DeleteMyProfile id={id} navigate={navigate} />
        {passwordChanged && (
          <div className="deleteMessage">
            <div className="deleteMessageBox">
              <p>Votre mot de passe a été modifié.</p>
              <button onClick={() => navigate("/")}>
                Retourner à l'accueil
              </button>
            </div>
          </div>
        )}
        {/* <div className="delete-user-profil__container">
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
                Vous pouvez réactiver votre compte à tout moment en envoyant
                votre demande à un administrateur.
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
                Lorsque vous supprimez votre compte Groupomania, vous ne pouvez
                plus en récupérer le contenu ou les informations que vous avez
                partagées.
              </p>
            </div> */}
      </div>
    </>
  );
};

export default DeleteProfile;
