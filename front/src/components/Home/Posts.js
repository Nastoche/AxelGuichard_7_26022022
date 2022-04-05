import React from "react";
import Post from "./Post";

const Posts = ({ allPosts, userId, fetchAllPosts, isAdmin }) => {
  return allPosts.map((post, pos) => {
    return (
      <div className="key-posts" key={pos}>
        <Post
          post={post}
          fetchAllPosts={fetchAllPosts}
          userId={userId}
          isAdmin={isAdmin}
        />
      </div>
    );
  });
};

export default Posts;
