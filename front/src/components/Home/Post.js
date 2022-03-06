import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";
import Comments from "./Comments";

const Post = ({ post, fetchAll, userId }) => {
  const { post_id } = post;
  const postTest = post;
  const navigate = useNavigate();

  const min = 10000;
  const max = 90000;
  let randomNumber = Math.floor(Math.random() * min) + max;

  // const handleSubmit = () => {
  //   // ...
  // };

  const handleDelete = () => {
    console.log(userId, post_id);
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
    fetchAll();
  };
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
            key={`${post.user_firstname}${randomNumber}`}
            className="post-container-top-name"
          >
            {post.user_firstname} {post.user_lastname}
          </p>
          <p
            key={`${post.date_creation}${randomNumber}`}
            className="post-container-top-date"
            onClick={() => navigate(`/post/${post.post_id}`)}
          >
            , {moment(post.date_creation).startOf("second").fromNow()}
            {/* .slice(0, 10) */}
          </p>
        </div>
        <div
          className="post-container-message"
          key={`${post.user_firstname}${randomNumber}`}
        >
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
          <button className="post-container-end__comment">
            <FontAwesomeIcon icon={faMessage} />
          </button>

          <button
            className="post-container-end__delete"
            onClick={() => {
              handleDelete(post.post_id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <Comments post={postTest} userId={userId} />
    </>
  );
};

export default Post;
