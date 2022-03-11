import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

const Comments = ({ post, userId }) => {
  const [allComments, setAllComments] = useState([]);
  const [commentsDate, setCommentsDate] = useState("");

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
        setCommentsDate(res.data[0].updated_at);
      })
      .catch((err) => {
        console.log(err);
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
          <Comment singleComment={comment} commentsDate={commentsDate} />
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
