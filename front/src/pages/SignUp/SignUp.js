import React from "react";
import SignUpForm from "../../components/Log/SignUpForm";
import TopLogoForm from "../../components/Log/TopLogoForm";
import { Helmet } from "react-helmet";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Groupomania - Inscription</title>
      </Helmet>
      <div className="container-login">
        <TopLogoForm />
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
