import axios from "axios";
import React, { useRef, useState } from "react";

const PostCommentOnePost = ({ postId, userId, fetchCommentsFromOnePost }) => {
  const [comment, setComment] = useState("");

  const handlePostComment = (e) => {
    e.preventDefault();
    console.log(`commentaire sur le post ${postId}`);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
      withCredentials: true,
      data: {
        post_id: postId,
        author_id: userId,
        message: comment,
      },
    })
      .then((res) => {
        console.log("commentaire créé !");
        fetchCommentsFromOnePost(postId);
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
  };
  return (
    <>
      <img
        className="post-users-img"
        src="../img/default-contact-img.png"
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

export default PostCommentOnePost;
