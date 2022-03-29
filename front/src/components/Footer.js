import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <NavLink end to="/">
          Groupomania
        </NavLink>{" "}
        ·
        <NavLink end to="/cgu">
          Conditions
        </NavLink>{" "}
      </div>
      <p>© 2022 Groupomania</p>
    </footer>
  );
};

export default Footer;
