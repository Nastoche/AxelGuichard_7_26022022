import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";

const CommentsFromOnePost = ({
  postId,
  allComments,
  fetchCommentsFromOnePost,
}) => {
  useEffect(() => {
    fetchCommentsFromOnePost(postId);
  }, [postId]);

  return allComments.map((comment) => {
    return (
      <>
        <div className="post-container-comments-comment">
          <p className="comment-name">
            {comment.user_firstname} {comment.user_lastname},{" "}
            <span className="commentDate">
              {moment(comment.created_at).startOf("second").fromNow()}
            </span>
          </p>
          <p className="comment-content">{comment.message}</p>
        </div>
      </>
    );
  });
};

export default CommentsFromOnePost;
