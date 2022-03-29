import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const PostComment = ({
  post,
  userId,
  fetchAllComments,
  comment,
  setComment,
}) => {
  const [isLong, setIsLong] = useState(true);
  const formRef = useRef();

  const handlePostComment = (e) => {
    e.preventDefault();
    if (isLong) {
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
          formRef.current.reset();
          setComment("");
          fetchAllComments(post.post_id);
        })
        .catch((err) => {
          console.log(`Echec post commentaire : ${err}`);
        });
    }
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
      <form ref={formRef} action="" onSubmit={handlePostComment}>
        <input
          type="text"
          placeholder="Écrivez un commentaire..."
          className="input-comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <input type="submit" value="Poster" className="publish-comment" />
        <button type="submit" className="publish-comment-phone">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </>
  );
};

export default PostComment;
