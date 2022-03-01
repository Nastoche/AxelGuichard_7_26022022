import React from "react";
import { NavLink } from "react-router-dom";

const SignUpSpan = () => {
  return (
    <div>
      <NavLink to="/signup" className="signup-end">
        Pas encore de compte ? Inscrivez-vous
      </NavLink>
    </div>
  );
};

export default SignUpSpan;
