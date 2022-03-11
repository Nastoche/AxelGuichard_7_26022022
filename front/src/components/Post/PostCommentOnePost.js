import axios from "axios";
import React, { useRef, useState } from "react";

const PostCommentOnePost = ({ postId, userId, setCommentInput }) => {
  const [comment, setComment] = useState("");
  // const inputRef = useRef();
  // setCommentInput(inputRef);

  const refreshPage = () => {
    window.location.reload(false);
  };

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
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
    refreshPage();
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
          // ref={inputRef}
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
