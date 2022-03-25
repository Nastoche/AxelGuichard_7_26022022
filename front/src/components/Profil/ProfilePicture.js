import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import FromData from "form-data";

const ProfilePicture = ({
  isUserProfil,
  id,
  userFirstName,
  userLastName,
  description,
  fetchProfilById,
}) => {
  const [file, setFile] = useState(null);
  const [isFile, setIsFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const inputFile = useRef(null);
  let data = new FormData();

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
        // setImageUrl(
        //   `${process.env.REACT_APP_API_URL}images/profils/default.png`
        // );
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPic = () => {
    inputFile.current.click();
  };
  const uploadPicture = (e) => {
    e.preventDefault();
    console.log(file);

    let formdata = new FormData();

    formdata.append("image", file);
    formdata.append("filename", "testimage");

    // console.log(data);
    // axios
    //   .put(`${process.env.REACT_APP_API_URL}api/user/${id}`, data)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/image`,
      withCredentials: true,
      data: formdata,
    })
      .then((res) => {
        // fetchProfilById(id);
        console.log("photo enregistrée !");
        getProfilePicture();
      })
      .catch((err) => {
        console.log("photo PAS enregistrée");
        console.log(err);
      });
  };

  useEffect(() => {
    if (file) {
      console.log(file);
      setIsFile(true);
    } else {
      setIsFile(false);
    }
  }, [handleFileChange]);

  useEffect(() => {
    getProfilePicture();
  }, []);
  // useEffect(() => {
  //   data.append("user_firstname", userFirstName);
  //   data.append("user_lastname", userLastName);
  //   data.append("profil_image", file);
  // }, [file]);
  return (
    <>
      <div className="img-container">
        <img className="user-infos-img" src={imageUrl} alt="" />
      </div>
      {isUserProfil && (
        <>
          <button className="user-infos-btn" onClick={handleUploadPic}>
            Modifier 📷
          </button>
          <input
            type="file"
            id="profil_image"
            ref={inputFile}
            accept="image/png, image/jpeg"
            name="profil_image"
            onChange={handleFileChange}
          />
          {isFile && (
            <button className="user-infos-btn" onClick={uploadPicture}>
              Enregistrer les modifications
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePicture;
