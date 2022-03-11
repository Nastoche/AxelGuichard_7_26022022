import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = ({ singleComment, postId, userId }) => {
  return (
    <>
      <p className="comment-name" key={singleComment.id}>
        {singleComment.user_firstname} {singleComment.user_lastname}
      </p>
      <p className="comment-content">{singleComment.message}</p>
    </>
  );
};

export default Comment;
