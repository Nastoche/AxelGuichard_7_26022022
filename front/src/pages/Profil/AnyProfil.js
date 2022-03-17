import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import ProfilComponents from "../../components/Profil/ProfilComponents";

const AnyProfil = () => {
  const { id } = useParams();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfilAdmin, setIsProfilAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [isUserProfil, setIsUserProfil] = useState(false);
  const [localUserId, setLocalUserId] = useState("");
  const [description, setDescription] = useState("");
  document.title = `Groupomania - ${userFirstName} ${userLastName}`;

  const navigate = useNavigate();

  const fetchProfilById = (id) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
      withCredentials: true,
      data: {
        user_id: id,
      },
    })
      .then((res) => {
        setUserFirstName(res.data[0].user_firstname);
        setUserLastName(res.data[0].user_lastname);
        setDescription(res.data[0].user_description);
        if (res.data[0].admin === 1) {
          setIsProfilAdmin(true);
        }
        if (id == localUserId) {
          setIsUserProfil(true);
        } else {
          setIsUserProfil(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
    setUserFirstName(
      JSON.parse(localStorage.getItem("user_info")).user.user_firstname
    );

    if (admin === 1) {
      setIsAdmin(true);
    }
    setLocalUserId(checkUserId);
  }, []);

  return (
    <>
      <Navbar localUserId={localUserId} isAdmin={isAdmin} />
      <ProfilComponents
        userFirstName={userFirstName}
        userLastName={userLastName}
        isProfilAdmin={isProfilAdmin}
        fetchProfilById={fetchProfilById}
        userId={userId}
        id={id}
        isUserProfil={isUserProfil}
        description={description}
      />
    </>
  );
};

export default AnyProfil;
