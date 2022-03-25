import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const UploadPost = ({ fetchAllPosts, userId, userFirstName }) => {
  const [postMessage, setPostMessage] = useState("");
  const [isLong, setIsLong] = useState(false);
  const formRef = useRef();

  const handleUploadPost = (e) => {
    e.preventDefault();
    if (isLong) {
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
          formRef.current.reset();
          setPostMessage("");
          fetchAllPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (postMessage.length > 0) {
      setIsLong(true);
    } else {
      setIsLong(false);
    }
  }, [postMessage]);

  return (
    <div className="upload-post">
      <img src="./img/default-contact-img.png" alt="" />
      <form action="" onSubmit={handleUploadPost} ref={formRef}>
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
