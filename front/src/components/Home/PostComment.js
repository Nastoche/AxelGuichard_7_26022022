import axios from "axios";
import React, { useState } from "react";

const PostComment = ({ post, userId }) => {
  const [comment, setComment] = useState("");

  const handlePostComment = (e) => {
    e.preventDefault();
    console.log(`commentaire sur le post ${post.post_id}`);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment/${post.post_id}`,
      withCredentials: true,
      data: {
        post_id: post.post_id,
        author_id: userId,
        message: comment,
      },
    })
      .then((res) => {
        console.log("commentaire créé !");
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
  };
  return (
    <>
      <img
        className="post-users-img"
        src="./img/default-contact-img.png"
        alt=""
      />
      <form action="" onSubmit={handlePostComment}>
        <input
          type="text"
          placeholder="Écrivez un commentaire..."
          className="input-comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <input type="submit" value="Poster" className="publish-comment" />
      </form>
    </>
  );
};

export default PostComment;
