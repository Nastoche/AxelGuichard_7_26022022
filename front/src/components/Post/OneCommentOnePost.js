import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const OneCommentOnePost = ({
  postId,
  userId,
  comment,
  fetchCommentsFromOnePost,
  isAdmin,
}) => {
  const [isUserComment, setIsUserComment] = useState(false);

  const handleDeleteComment = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/comment/${comment.id}`,
      withCredentials: true,
      data: {
        id: comment.id,
      },
    })
      .then((res) => {
        console.log("Commentaire supprimé !");
        fetchCommentsFromOnePost(postId);
      })
      .catch((err) => {
        console.log(`Echec suppression de commentaire : ${err}`);
      });
  };

  useEffect(() => {
    if (userId == comment.user_id || isAdmin) {
      setIsUserComment(true);
    } else {
      setIsUserComment(false);
    }
  }, []);

  return (
    <div className="post-container-comments-comment">
      <p className="comment-name">
        {comment.user_firstname} {comment.user_lastname},{" "}
        <span className="commentDate">
          {moment(comment.created_at).startOf("second").fromNow()}
        </span>
        {isUserComment && (
          <span className="comment-delete" onClick={handleDeleteComment}>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        )}
      </p>
      <p className="comment-content">{comment.message}</p>
    </div>
  );
};

export default OneCommentOnePost;
