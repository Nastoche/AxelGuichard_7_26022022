import React, { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ post, userId, fetchAllComments, allComments }) => {
  useEffect(() => {
    if (post !== undefined) {
      const { post_id } = post;
      fetchAllComments(post_id);
    }
  }, [post]);

  return (allComments || []).map((comment) => {
    return (
      <>
        <div className="post-container-comments-comment">
          <Comment singleComment={comment} />
        </div>
      </>
    );
  });
};

export default Comments;
