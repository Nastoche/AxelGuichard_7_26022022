import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = ({ singleComment, postId, userId }) => {
  console.log(singleComment);

  return (
    <>
      <p className="comment-name">
        {singleComment.user_firstname} {singleComment.user_lastname}
      </p>
      <p className="comment-content">{singleComment.message}</p>

      {/* <div className="post-container-comments-users">
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
              setCommentaire(e.target.value);
            }}
          />
          <input type="submit" value="Poster" className="publish-comment" />
        </form>
      </div> */}
    </>
  );
};

export default Comment;
