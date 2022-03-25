import axios from "axios";
import React, { useRef, useState } from "react";

const PostCommentOnePost = ({ setComment, handlePostComment, formRef }) => {
  return (
    <>
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
