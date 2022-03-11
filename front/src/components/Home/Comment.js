import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";

const Comment = ({ singleComment }) => {
  return (
    <>
      <p className="comment-name" key={singleComment.id}>
        {singleComment.user_firstname} {singleComment.user_lastname},{" "}
        <span className="commentDate">
          {moment(singleComment.created_at).startOf("second").fromNow()}
        </span>
      </p>
      <p className="comment-content">{singleComment.message}</p>
    </>
  );
};

export default Comment;
