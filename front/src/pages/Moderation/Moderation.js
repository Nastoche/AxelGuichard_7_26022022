import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import NoReportedPost from "../../components/Reports/NoReportedPost";
import Reports from "./Reports";
import { Helmet } from "react-helmet";

const Moderation = () => {
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotification, setAdminNotification] = useState("");
  const [isReportedPosts, setIsReportedPosts] = useState(null);

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
          setAdminNotification(res.data[0].total);
          if (res.data[0].total === 0) {
            setIsReportedPosts(true);
          } else {
            setIsReportedPosts(false);
          }
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

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(checkUserId);
  }, []);

  useEffect(() => {
    getNumberOfReports();
  });

  return (
    <>
      <Helmet>
        <title>Groupomania - Modération</title>
      </Helmet>
      <Navbar isAdmin={isAdmin} localUserId={userId} />
      <div className="container-bloc">
        {isReportedPosts && <NoReportedPost navigate={navigate} />}
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
