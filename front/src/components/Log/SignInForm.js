import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        user_email: email,
        user_password: password,
      },
    })
      .then((res) => {
        if (res.data.error) {
          setErrors({
            ...errors,
            message: "Mauvaise combinaison Email / Mot de passe",
          });
        } else {
          localStorage.setItem("user_info", JSON.stringify(res.data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-bloc">
      <div className="login-form">
        <form action="" onSubmit={handleLogin} id="sign-up-form">
          <label htmlFor="email">Email</label>
          {/* <br /> */}
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="password">Mot de passe</label>
          {/* <br /> */}
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <div className="error">{errors.message}</div>
          <br />
          <input type="submit" value="Se connecter" className="login-btn" />
        </form>
      </div>
      <br />
      <NavLink to="/signup" className="signup-end">
        Pas encore de compte ? Inscrivez-vous
      </NavLink>
    </div>
  );
};

export default SignInForm;
