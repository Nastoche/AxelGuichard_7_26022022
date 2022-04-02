import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

const Description = ({
  isUserProfil,
  description,
  id,
  userFirstName,
  userLastName,
  fetchProfilById,
}) => {
  const [isModifying, setIsModifying] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [publishBtnValue, setPublishBtnValue] = useState("Modifier ✏️");

  const handleDescription = () => {
    setIsModifying(true);
    setPublishBtnValue("Annuler");
    if (isModifying) {
      if (publishBtnValue === "Annuler") {
        setIsModifying(false);
        setPublishBtnValue("Modifier ✏️");
      }
    }
  };

  const handleUpdateDescription = (e) => {
    e.preventDefault();
    if (descriptionValue === description) {
      return;
    } else if (descriptionValue.length > 0) {
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        withCredentials: true,
        data: {
          user_firstname: userFirstName,
          user_lastname: userLastName,
          user_description: descriptionValue,
        },
        params: {
          id: id,
        },
      })
        .then((res) => {
          setIsModifying(false);
          setPublishBtnValue("Modifier ✏️");
          fetchProfilById(id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (isModifying) {
      if (descriptionValue === description) {
        setPublishBtnValue("Annuler");
      } else {
        setPublishBtnValue("Publier");
      }
    }
  }, [descriptionValue]);

  useEffect(() => {
    fetchProfilById(id);
  }, [handleDescription]);
  return (
    <>
      <form action="" onSubmit={handleUpdateDescription}>
        {!isModifying && <p className="user-infos-desc">{description}</p>}
        {isModifying && (
          <textarea
            className="user-infos-textarea"
            defaultValue={description}
            onChange={(e) => setDescriptionValue(e.target.value)}
          ></textarea>
        )}

        {isUserProfil && (
          <button className="user-infos-btn" onClick={handleDescription}>
            {publishBtnValue}
          </button>
        )}
      </form>
    </>
  );
};

export default Description;
