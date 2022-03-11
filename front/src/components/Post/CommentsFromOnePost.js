import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentsFromOnePost = ({ postId, userId }) => {
  const [allComments, setAllComments] = useState([]);
  const fetchCommentsFromOnePost = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}/allcomments`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        setAllComments(res.data);
        // setAllPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCommentsFromOnePost();
  }, []);

  return allComments.map((comment) => {
    console.log(comment);
    console.log(allComments);
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
