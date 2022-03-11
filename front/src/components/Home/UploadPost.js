import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPost = ({ fetchAllPosts, userId, userFirstName }) => {
  const [postMessage, setPostMessage] = useState("");

  const handleUploadPost = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
      data: {
        post_user_id: userId,
        message: postMessage,
      },
    })
      .then((res) => {
        fetchAllPosts();
        console.log("post créé avec succès !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="upload-post">
      <img src="./img/default-contact-img.png" alt="" />
      <form action="" onSubmit={handleUploadPost}>
        <input
          type="text"
          name="uploadpost"
          className="upload-post-input"
          placeholder={`Quoi de neuf, ${userFirstName} ?`}
          onChange={(e) => setPostMessage(e.target.value)}
        />
        <br />
        <input type="submit" value="Publier" className="upload-post-btn" />
      </form>
    </div>
  );
};

export default UploadPost;
