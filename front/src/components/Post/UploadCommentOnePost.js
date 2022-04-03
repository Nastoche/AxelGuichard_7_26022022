import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const UploadCommentOnePost = ({
  setComment,
  handlePostComment,
  formRef,
  commentRef,
}) => {
  return (
    <>
      <form ref={formRef} action="" onSubmit={handlePostComment}>
        <input
          ref={commentRef}
          type="text"
          placeholder="Écrivez un commentaire..."
          className="input-comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <input type="submit" value="Poster" className="publish-comment" />
        <button type="submit" className="publish-comment-phone">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </>
  );
};

export default UploadCommentOnePost;
