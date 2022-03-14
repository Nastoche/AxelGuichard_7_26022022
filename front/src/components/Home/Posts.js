import React from "react";
import Post from "./Post";

const Posts = ({ allPosts, userId, fetchAllPosts, isAdmin }) => {
  return allPosts.map((post) => {
    console.log(post);
    return (
      <Post
        post={post}
        fetchAllPosts={fetchAllPosts}
        userId={userId}
        isAdmin={isAdmin}
      />
    );
  });
};

export default Posts;
