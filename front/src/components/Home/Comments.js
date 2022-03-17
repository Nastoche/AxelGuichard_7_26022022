import React, { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ post, userId, fetchAllComments, allComments, isAdmin }) => {
  useEffect(() => {
    if (post !== undefined) {
      const { post_id } = post;
      fetchAllComments(post_id);
    }
  }, [post]);

  return (allComments || []).map((comment) => {
    return (
      <>
        <Comment
          singleComment={comment}
          userId={userId}
          fetchAllComments={fetchAllComments}
          post={post}
          isAdmin={isAdmin}
        />
      </>
    );
  });
};

export default Comments;
