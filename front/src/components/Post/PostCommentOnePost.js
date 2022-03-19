import axios from "axios";
import React, { useRef, useState } from "react";

const PostCommentOnePost = ({ setComment, handlePostComment, formRef }) => {
  return (
    <>
      <img
        className="post-users-img"
        src="../img/default-contact-img.png"
        alt=""
      />
      <form ref={formRef} action="" onSubmit={handlePostComment}>
        <input
          type="text"
          placeholder="Écrivez un commentaire..."
          className="input-comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <input type="submit" value="Poster" className="publish-comment" />
      </form>
    </>
  );
};

export default PostCommentOnePost;
