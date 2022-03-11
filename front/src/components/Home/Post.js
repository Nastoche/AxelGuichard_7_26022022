import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";
import Comments from "./Comments";
import PostComment from "./PostComment";

const Post = ({ post, fetchAllPosts, userId, isAdmin }) => {
  const [isPostUser, setIsPostUser] = useState(false);
  const [commentInput, setCommentInput] = useState(null);
  const { post_id } = post;

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleDelete = () => {
    // console.log("user : " + userId + " " + "post : " + post_id);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${post_id}`,
      withCredentials: true,
      data: {
        post_id,
        post_user_id: userId,
      },
    })
      .then((res) => {
        console.log("Post supprimé !");
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
    // fetchAllPosts();
    refreshPage();
  };

  useEffect(() => {
    if (post.post_user_id === userId || isAdmin) {
      setIsPostUser(true);
    }
  }, []);
  return (
    <>
      <div className="post-container">
        <div className="post-container-top">
          <img
            className="post-users-img"
            src="./img/default-contact-img.png"
            alt=""
          />
          <p
            key={`${post.post_user_id}${post.date_creation}`}
            className="post-container-top-name"
          >
            {post.user_firstname} {post.user_lastname}
          </p>
          <p
            key={`${post.post_user_id}`}
            className="post-container-top-date"
            onClick={() => navigate(`/post/${post.post_id}`)}
          >
            , {moment(post.date_creation).startOf("second").fromNow()}
          </p>
        </div>
        <div className="post-container-message" key={`${post.post_user_id}`}>
          {post.message}
        </div>
        <hr />
        <div className="post-container-end">
          <button className="post-container-end__like">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="post-container-end__like-i"
            />
          </button>
          <button
            className="post-container-end__comment"
            // onClick={() => commentInput.focus()}
          >
            <FontAwesomeIcon icon={faMessage} />
          </button>

          {isPostUser && (
            <button
              className="post-container-end__delete"
              onClick={() => {
                handleDelete(post.post_id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}
        </div>
      </div>
      <div className="post-container-comments">
        <Comments post={post} userId={userId} />
        <div className="post-container-comments-users">
          <PostComment
            post={post}
            userId={userId}
            setCommentInput={setCommentInput}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
