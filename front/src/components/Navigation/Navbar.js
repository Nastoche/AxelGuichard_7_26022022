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
          // console.log(res.data[0].total);
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
      console.log("yo");
      getNumberOfReports();
    }
  });

  return (
    <>
      <div className="logo-signup">
        <img
          src="../img/logo/icon-left-font-monochrome-white.svg"
          alt="logo de groupomania"
          onClick={backHome}
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
                <NavLink className="nav-links" end to="/moderation">
                  <FontAwesomeIcon icon={faWrench} />
                </NavLink>
                <span className="moderation-notification">
                  {adminNotification}
                </span>
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
        {/* <div className="round-svg">
          <svg
            className="arrondis-theme black-arrondis"
            version="1.1"
            id="Calque_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1440 48"
            style={{ enableBackground: 'new 0 0 1440 48"' }}
            xmlSpace="preserve"
          >
            <path d="M1440,48H0V0c0,0,205,47,720,47s720-46.9,720-46.9V48z"></path>
          </svg>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
