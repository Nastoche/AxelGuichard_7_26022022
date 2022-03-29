import React, { useEffect, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { NavLink } from "react-router-dom";

export default function SignUpForm() {
  const [errors, setErrors] = useState({
    // email: "",
    // firstname: "",
    // lastname: "",
    // passwordConfirm: "",
    // terms: "",
  });
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [controlPassword, setControlPassword] = useState("");
  const [isLetterOk, setIsLetterOk] = useState(false);
  const [isNumberOk, setIsNumberOk] = useState(false);
  const [isSpecialOk, setIsSpecialOk] = useState(false);
  const [isMinMaxOk, setIsMinMaxOk] = useState(false);

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regexName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&éè])[A-Za-z\d@$!%*#?&éè]{8,32}$/; // Minimum 8 caractères, au moins une lettre, un chiffre et un caractère spécial

  const regexLetter = /[a-zA-Z]/g; // Check si le string contient au moins une lettre
  const regexNum = /\d/; // Check s'il y a un chiffre
  const regexSpecial = /[@$!%*#?&éè]/;
  const regexMinMax = /^.{8,32}$/; // Check si le mdp contient minimum 8 caractères et maximum 32

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    if (regexEmail.test(e.target.value) || e.target.value.length === 0) {
      setErrors({ email: "" });
    } else {
      setErrors({ ...errors, email: "Veuillez entrer une adresse valide" });
    }
  };

  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
    if (
      regexName.test(e.target.value) === true ||
      e.target.value.length === 0
    ) {
      setErrors({ ...errors, firstname: "" });
    } else {
      setErrors({ ...errors, firstname: "Entrez votre prénom" });
    }
  };

  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
    if (
      regexName.test(e.target.value) === true ||
      e.target.value.length === 0
    ) {
      setErrors({ ...errors, lastname: "" });
    } else {
      setErrors({ ...errors, lastname: "Entrez votre nom" });
    }
  };

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

  const handleControlPasswordInput = (e) => {
    setControlPassword(e.target.value);
    if (password === e.target.value) {
      setErrors({ ...errors, passwordConfirm: "" });
    } else {
      setErrors({
        ...errors,
        passwordConfirm: "Les mots de passe ne correspondent pas",
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!terms) {
      setErrors({
        ...errors,
        terms: "Veuillez accepter les conditions d'utilisation",
      });
    } else {
      setErrors({ ...errors, terms: "" });
    }

    if (
      password !== controlPassword ||
      !regexPassword.test(password) ||
      !terms ||
      !regexName.test(firstName) ||
      !regexName.test(lastName) ||
      !regexEmail.test(email)
    ) {
      return;
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          user_firstname: firstName,
          user_lastname: lastName,
          user_email: email,
          user_password: password,
        },
      })
        .then((res) => {
          console.log(res);
          if (!res.data.errors) {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">
            Inscription réussie, veuillez vous connecter
          </h4>
        </>
      ) : (
        <>
          <div className="container-bloc-form">
            <div className="login-form">
              <form action="" onSubmit={handleRegister} id="sign-up-form">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="exemple@groupomania.fr"
                  onChange={handleEmailInput}
                  value={email}
                />
                <div className="email error">{errors.email}</div>
                <br />

                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Prénom"
                  onChange={
                    handleFirstNameInput
                    // if (
                    //   e.target.value.length <= 2 &&
                    //   e.target.value.length > 0
                    // ) {
                    //   setErrors({ ...errors, firstname: "Entrez votre nom" });
                    // } else {
                    //   setErrors({ ...errors, firstname: "" });
                    // }
                  }
                  value={firstName}
                />
                <div className="error">{errors.firstname}</div>
                <br />

                <label htmlFor="flastName">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Nom"
                  onChange={
                    handleLastNameInput
                    // if (
                    //   e.target.value.length < 2 &&
                    //   e.target.value.length > 0
                    // ) {
                    //   setErrors({ ...errors, lastname: "Entrez votre nom" });
                    // } else {
                    //   setErrors({ ...errors, lastname: "" });
                    // }
                  }
                  value={lastName}
                />
                <div className="error">{errors.lastname}</div>
                <br />

                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Entrez un mot de passe"
                  onChange={handlePasswordInput}
                  value={password}
                />
                <div className="password error">{errors.password}</div>
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

                <label htmlFor="password-conf">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password-conf"
                  placeholder="Confirmez votre mot de passe"
                  onChange={handleControlPasswordInput}
                  value={controlPassword}
                />
                <div className="password-confirm error">
                  {errors.passwordConfirm}
                </div>
                <br />
                <div className="cgu-container">
                  <input
                    type="checkbox"
                    id="terms"
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <label htmlFor="terms" className="terms">
                    J'ai lu et j'accepte les{" "}
                    <NavLink target="_blank" to="/cgu" className="cgu-box">
                      conditions générales
                    </NavLink>
                  </label>
                </div>

                <div className="terms error">{errors.terms}</div>
                <br />
                <input
                  type="submit"
                  value="Valider inscription"
                  className="signup-btn"
                />
                <NavLink end to={"/login"} className="signup-form-end">
                  J'ai déjà un compte
                </NavLink>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
