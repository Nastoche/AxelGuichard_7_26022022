import React from "react";
import SignInForm from "../../components/Log/SignInForm";
import TopLogoForm from "../../components/Log/TopLogoForm";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Groupomania - Connexion</title>
      </Helmet>
      <TopLogoForm />
      <SignInForm />
    </>
  );
};

export default Login;
