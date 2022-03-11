import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const PostComment = ({
  post,
  userId,
  setCommentInput,
  fetchAllComments,
  comment,
  setComment,
}) => {
  const [isLong, setIsLong] = useState(true);
  // const inputRef = useRef();
  // setCommentInput(inputRef);

  const refreshPage = () => {
    window.location.reload(false);
  };

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
        fetchAllComments(post.post_id);
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
  };

  useEffect(() => {
    if (comment.length >= 200 || comment.length <= 0) {
      setIsLong(false);
    } else {
      setIsLong(true);
    }
  }, [comment]);
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
        {comment.length < 200 && comment.length > 0 && (
          <input type="submit" value="Poster" className="publish-comment" />
        )}
        {!isLong && <button className="publish-comment">Poster</button>}
      </form>
    </>
  );
};

export default PostComment;
