import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";

const Comment = ({
  singleComment,
  userId,
  fetchAllComments,
  post,
  isAdmin,
}) => {
  const [isUserComment, setIsUserComment] = useState(false);

  const handleDeleteComment = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/comment/${singleComment.id}`,
      withCredentials: true,
      data: {
        id: singleComment.id,
      },
    })
      .then((res) => {
        console.log("Commentaire supprimé !");
        fetchAllComments(post.post_id);
      })
      .catch((err) => {
        console.log(`Echec suppression de commentaire : ${err}`);
      });
  };

  useEffect(() => {
    if (userId == singleComment.user_id || isAdmin) {
      setIsUserComment(true);
    } else {
      setIsUserComment(false);
    }
  }, []);
  return (
    <>
      <div className="post-container-comments-comment">
        <p className="comment-name" key={singleComment.user_id}>
          {singleComment.user_firstname} {singleComment.user_lastname},{" "}
          <span className="commentDate">
            {moment(singleComment.created_at).startOf("second").fromNow()}
          </span>
          {isUserComment && (
            <span className="comment-delete" onClick={handleDeleteComment}>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          )}
        </p>
        <p className="comment-content">{singleComment.message}</p>
        <hr />
      </div>
    </>
  );
};

export default Comment;
