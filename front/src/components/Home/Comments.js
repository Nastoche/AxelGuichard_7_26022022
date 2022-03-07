import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import PostComment from "./PostComment";

const Comments = ({ post, userId }) => {
  const [allComments, setAllComments] = useState([]);

  const fetchAllComments = (post_id) => {
    // console.log(post);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/comment/${post_id}/allcomments`,
      withCredentials: true,
      params: {
        id: post_id,
        user_id: userId,
      },
    })
      .then((res) => {
        // fetchAllComments()
        setAllComments(res.data);
      })
      .catch((err) => {
        console.log(err + " coucou !");
      });
  };

  useEffect(() => {
    if (post !== undefined) {
      const { post_id } = post;
      fetchAllComments(post_id);
    }
  }, []);

  return allComments.map((comment) => {
    return (
      <>
        <div className="post-container-comments-comment">
          <Comment singleComment={comment} />
        </div>
        {/* <div className="post-container-comments-users">
          <PostComment
            post={post}
            userId={userId}
            fetchAllComments={fetchAllComments}
          />
        </div> */}
      </>
    );
  });
};

export default Comments;
