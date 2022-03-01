import React from "react";
import SignInForm from "../../components/Log/SignInForm";
import SignUpSpan from "../../components/Log/SignUpSpan";
import TopLogoForm from "../../components/Log/TopLogoForm";

const Login = () => {
  document.title = `Groupomania - Connexion`;
  return (
    <>
      <TopLogoForm />
      <SignInForm />
      <SignUpSpan />
    </>
  );
};

export default Login;
