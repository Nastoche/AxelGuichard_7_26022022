import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ localUserId, isAdmin }) => {
  const [adminNotification, setAdminNotification] = useState("");
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  const moderationTab = () => {
    navigate("/moderation");
  };

  const getNumberOfReports = () => {
    if (isAdmin === true) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/post/getNumberOfReports`,
        withCredentials: true,
        data: {
          isAdmin,
        },
      })
        .then((res) => {
          setAdminNotification(res.data[0].total);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const handleDisconnect = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
      withCredentials: true,
    })
      .then((res) => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isAdmin === true) {
      getNumberOfReports();
    }
  });

  return (
    <>
      <div className="logo-signup">
        <img
          // src="./img/logo/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
          onClick={backHome}
          className="img large small"
        />
        <nav>
          <ul>
            <li className="home">
              <NavLink className="nav-links" end to="/">
                <FontAwesomeIcon icon={faHome} />
              </NavLink>
            </li>
            {isAdmin && (
              <li className="moderation">
                {adminNotification > 0 && (
                  <span
                    className="moderation-notification"
                    onClick={moderationTab}
                  >
                    {adminNotification}
                  </span>
                )}
                <NavLink
                  className="nav-links"
                  id="moderation"
                  end
                  to="/moderation"
                >
                  <FontAwesomeIcon icon={faWrench} />
                </NavLink>
              </li>
            )}

            <li className="profil">
              <NavLink className="nav-links" end to={`/profil/${localUserId}`}>
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
            <li className="signout">
              <span className="nav-links" onClick={handleDisconnect}>
                <FontAwesomeIcon icon={faSignOut} />
              </span>
            </li>
          </ul>
        </nav>
        <div></div>
      </div>
    </>
  );
};

export default Navbar;
