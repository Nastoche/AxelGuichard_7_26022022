import React, { useRef, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { NavLink } from "react-router-dom";

export default function SignUpForm() {
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== controlPassword || terms === false) {
      if (password !== controlPassword) {
        setErrors({
          ...errors,
          passwordConfirm: "Les mots de passe ne correspondent pas",
        });
      }
      if (terms === false) {
        setErrors({
          ...errors,
          terms: "Veuillez accepter les conditions générales d'utilisation",
        });
      }
    } else {
      await axios({
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
          if (res.data.errors) {
            setErrors({
              ...errors,
              email: res.data.errors,
              // pseudo: res.data.errors.pseudo,
              // password: res.data.errors.password,
            });
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-bloc">
      <div className="login-form">
        {formSubmit ? (
          <>
            <SignInForm />
            <h4 className="success">
              Inscription réussie, veuillez vous connecter
            </h4>
          </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error">{errors.email}</div>
            <br />

            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <div className="pseudo error">{errors.pseudo}</div>
            <br />

            <label htmlFor="flastName">Nom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <div className="pseudo error">{errors.pseudo}</div>
            <br />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error">{errors.password}</div>
            <br />

            <label htmlFor="password-conf">Confirmer le mot de passe</label>
            <input
              type="password"
              name="password"
              id="password-conf"
              onChange={(e) => setControlPassword(e.target.value)}
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
              <label htmlFor="terms">
                J'ai lu et j'accepte les{" "}
                <NavLink to="/cgu" className="cgu-box">
                  conditions générales
                </NavLink>
              </label>
            </div>

            <div className="terms error">{errors.terms}</div>
            <br />
            <input type="submit" value="Valider inscription" />
          </form>
        )}
      </div>
    </div>
  );
}
