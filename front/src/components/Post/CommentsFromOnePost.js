import axios from "axios";
import React, { useEffect, useState } from "react";
import "moment/locale/fr";
import OneCommentOnePost from "./OneCommentOnePost";

const CommentsFromOnePost = ({
  postId,
  userId,
  allComments,
  fetchCommentsFromOnePost,
  isAdmin,
}) => {
  useEffect(() => {
    fetchCommentsFromOnePost(postId);
  }, []);

  return allComments.map((comment) => {
    return (
      <>
        <OneCommentOnePost
          postId={postId}
          userId={userId}
          comment={comment}
          fetchCommentsFromOnePost={fetchCommentsFromOnePost}
          isAdmin={isAdmin}
        />
      </>
    );
  });
};

export default CommentsFromOnePost;
