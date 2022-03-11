import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import ProfilComponents from "../../components/Profil/ProfilComponents";

const AnyProfil = () => {
  const { id } = useParams();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [isUserProfil, setIsUserProfil] = useState(false);

  const fetchProfilById = () => {
    const localUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
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
        if (res.data[0].admin === 1) {
          setIsAdmin(true);
        }
        if (id == localUserId) {
          setIsUserProfil(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   useEffect(() => {});

  return (
    <>
      <Navbar id={id} />
      <ProfilComponents
        userFirstName={userFirstName}
        userLastName={userLastName}
        isAdmin={isAdmin}
        fetchProfilById={fetchProfilById}
        userId={userId}
        id={id}
        isUserProfil={isUserProfil}
      />
    </>
  );
};

export default AnyProfil;
