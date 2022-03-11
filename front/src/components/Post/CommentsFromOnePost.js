import axios from "axios";
import React, { useEffect, useState } from "react";

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
            {comment.user_firstname} {comment.user_lastname}
          </p>
          <p className="comment-content">{comment.message}</p>
        </div>
      </>
    );
  });
};

export default CommentsFromOnePost;
