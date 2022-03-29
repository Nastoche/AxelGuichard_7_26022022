import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation/Navbar";
import ProfileComponents from "../../components/Profil/ProfileComponents";

const AnyProfile = () => {
  const { id } = useParams();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfilAdmin, setIsProfilAdmin] = useState(false);
  const [isUserProfil, setIsUserProfil] = useState(false);
  const [localUserId, setLocalUserId] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  document.title = `Groupomania - ${userFirstName} ${userLastName}`;

  const navigate = useNavigate();

  const getProfilePicture = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/image/${id}`,
      withCredentials: true,
      params: {
        id,
      },
    })
      .then((res) => {
        if (res.data[0]) {
          setImageUrl(
            `${process.env.REACT_APP_API_URL}images/profils/${res.data[0].image_url}`
          );
        } else {
          setImageUrl(
            `${process.env.REACT_APP_API_URL}images/profils/default.png`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProfilById = (id) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserFirstName(res.data[0].user_firstname);
        setUserLastName(res.data[0].user_lastname);
        setDescription(res.data[0].user_description);
        setIsProfilAdmin(res.data[0].admin === 1);
        setIsUserProfil(id === localUserId.toString());
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
    } else {
      setIsAdmin(false);
    }
    setLocalUserId(checkUserId);
  }, [navigate, id]);

  return (
    <>
      <Navbar localUserId={localUserId} isAdmin={isAdmin} />
      <ProfileComponents
        userFirstName={userFirstName}
        userLastName={userLastName}
        isProfilAdmin={isProfilAdmin}
        fetchProfilById={fetchProfilById}
        id={id}
        isUserProfil={isUserProfil}
        description={description}
        getProfilePicture={getProfilePicture}
        imageUrl={imageUrl}
      />
      <Footer />
    </>
  );
};

export default AnyProfile;
