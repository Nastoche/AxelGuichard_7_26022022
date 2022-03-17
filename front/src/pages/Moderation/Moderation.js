import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import Reports from "./Reports";

const Moderation = () => {
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotification, setAdminNotification] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    // setUserFirstName(
    //   JSON.parse(localStorage.getItem("user_info")).user.user_firstname
    // );

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(checkUserId);
  }, []);

  return (
    <>
      <Navbar isAdmin={isAdmin} localUserId={userId} />
      <div className="container-bloc">
        <Reports
          userId={userId}
          isAdmin={isAdmin}
          getNumberOfReports={getNumberOfReports}
        />
      </div>
    </>
  );
};

export default Moderation;
