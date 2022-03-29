import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const UploadPost = ({
  fetchAllPosts,
  userId,
  userFirstName,
  navigate,
  floatingPost,
}) => {
  const [postMessage, setPostMessage] = useState("");
  const [isLong, setIsLong] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const formRef = useRef();

  const getProfilePicture = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/image/${userId}`,
      withCredentials: true,
      params: {
        id: userId,
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

  useEffect(() => {
    if (userId) {
      getProfilePicture();
    }
  });

  return (
    <div className="upload-post">
      <div
        className="post-container-top-img-container"
        onClick={(e) => navigate(`/profil/${userId}`)}
      >
        <img className="post-users-img" src={imageUrl} alt="" />
      </div>
      <form action="" onSubmit={handleUploadPost} ref={formRef}>
        <input
          type="text"
          name="uploadpost"
          className="upload-post-input"
          placeholder={`Quoi de neuf, ${userFirstName} ?`}
          onChange={(e) => setPostMessage(e.target.value)}
          ref={floatingPost}
        />
        <br />
        <input type="submit" value="Publier" className="upload-post-btn" />
      </form>
    </div>
  );
};

export default UploadPost;
