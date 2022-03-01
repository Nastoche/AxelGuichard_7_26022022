import React from "react";
import SignUpForm from "../../components/Log/SignUpForm";
import TopLogoForm from "../../components/Log/TopLogoForm";

const SignUp = () => {
  document.title = `Groupomania - Inscription`;
  return (
    <div className="container-login">
      <TopLogoForm />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
