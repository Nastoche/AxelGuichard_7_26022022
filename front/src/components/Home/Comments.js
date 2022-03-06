import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";

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
        // console.log(res.data);
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
      console.log(post_id);
    }
  }, []);

  return allComments.map((comment) => {
    return (
      <Comment
        post={post}
        commentaire={comment}
        userId={userId}
        // fetchAllComments={fetchAllComments}
      />
    );
  });
};

export default Comments;
