import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileSettings from "../../components/Profile/ProfileSettings";
import Description from "../../components/Profile/Description";
import ProfilePicture from "../../components/Profile/ProfilePicture";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation/Navbar";

const Profile = () => {
  const { id } = useParams();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileAdmin, setIsProfileAdmin] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);
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
        setIsProfileAdmin(res.data[0].admin === 1);
        setIsUserProfile(id === localUserId.toString());
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

  useLayoutEffect(() => {
    fetchProfilById(id);
    getProfilePicture(id);
  });

  return (
    <>
      <Navbar localUserId={localUserId} isAdmin={isAdmin} />
      <div className="container-bloc">
        <div className="user-infos">
          <ProfilePicture
            isUserProfile={isUserProfile}
            id={id}
            userFirstName={userFirstName}
            userLastName={userLastName}
            description={description}
            fetchProfilById={fetchProfilById}
            getProfilePicture={getProfilePicture}
            imageUrl={imageUrl}
          />

          <h4 className="user-infos-name">
            {userFirstName} {userLastName}
          </h4>
          {isProfileAdmin && <p>Administrateur</p>}
          {!isProfileAdmin && <p>{`Employé(e)`}</p>}

          <hr />
          <Description
            isUserProfile={isUserProfile}
            description={description}
            id={id}
            userFirstName={userFirstName}
            userLastName={userLastName}
            fetchProfilById={fetchProfilById}
          />
        </div>
        {isUserProfile && (
          <div className="delete-user">
            <ProfileSettings id={id} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
