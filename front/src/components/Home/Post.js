import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";
import Comments from "./Comments";
import PostComment from "./PostComment";

const Post = ({ post, fetchAllPosts, userId, isAdmin }) => {
  const [isPostUser, setIsPostUser] = useState(false);
  const { post_id, post_user_id } = post;
  const [allComments, setAllComments] = useState([]);
  const [longCommentError, setLongCommentError] = useState("");
  const [comment, setComment] = useState("");
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  const handleProfilPage = () => {
    navigate(`/profil/${post_user_id}`);
  };

  const handleReport = () => {
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}api/post/${post_id}/report`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
        isAdmin,
      },
    })
      .then((res) => {
        console.log(`${post_id} reporté avec succès !`);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(post_id);
  };

  const fetchLikes = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${post_id}/postLikedByUser`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        if (res.data[0]) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeCount = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post_id,
      },
    })
      .then((res) => {
        setCountLikes(res.data[0].total);
        // console.log(res.data[0].total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}api/post/${post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        // console.log(`Post ${post_id} liké !`);
        handleLikeCount();
      })
      .catch((err) => {
        console.log(`Echec like post : ${err}`);
      });
  };

  const handleDelete = () => {
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
        // console.log("Post supprimé !");
        fetchAllPosts();
      })
      .catch((err) => {
        // console.log(`Echec suppression de post : ${err}`);
      });
    // refreshPage();
  };

  const fetchAllComments = (post_id) => {
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
        setAllComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (post.post_user_id === userId || isAdmin) {
      setIsPostUser(true);
    } else {
      setIsPostUser(false);
    }
    if (comment.length >= 200) {
      setLongCommentError("Votre commentaire est trop long.");
    } else {
      setLongCommentError("");
    }
  }, [post, comment]);

  useEffect(() => {
    handleLikeCount();
    fetchLikes();
  }, [handleLike]);
  return (
    <>
      <div className="post-container">
        <div className="post-container-top">
          <img
            className="post-users-img"
            src="./img/default-contact-img.png"
            alt=""
          />

          <div className="post-container-top-infos">
            <p
              key={`${post.post_user_id}${post.date_creation}`}
              className="post-container-top-name"
              onClick={handleProfilPage}
            >
              {post.user_firstname} {post.user_lastname}
            </p>
            <span
              key={`${post.post_user_id}`}
              className="post-container-top-date"
              onClick={() => navigate(`/post/${post.post_id}`)}
            >
              {moment(post.date_creation).startOf("second").fromNow()}
            </span>
          </div>
        </div>
        <div className="post-container-message" key={`${post.post_user_id}`}>
          {post.message}
        </div>
        <div className="post-container-countlikes">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="post-container-countlikes-icon"
          />
          <span className="post-container-countlikes-count">{countLikes}</span>
        </div>
        <hr />
        <div className="post-container-end">
          {isLiked && (
            <button onClick={handleLike} className="post-container-end__liked">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
            </button>
          )}
          {!isLiked && (
            <button onClick={handleLike} className="post-container-end__like">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
            </button>
          )}
          <button className="post-container-end__comment">
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
          {!isPostUser && (
            <button
              onClick={handleReport}
              className="post-container-end__report"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </button>
          )}
        </div>
      </div>
      <div className="post-container-comments">
        <Comments
          post={post}
          userId={userId}
          fetchAllComments={fetchAllComments}
          allComments={allComments}
        />
        <div className="post-container-comments-users">
          <PostComment
            post={post}
            userId={userId}
            fetchAllComments={fetchAllComments}
            comment={comment}
            setComment={setComment}
          />
        </div>
        <p className="comment-error">{longCommentError}</p>
        {comment.length > 0 && (
          <p className="charCount">{comment.length}/200 caractères</p>
        )}
      </div>
    </>
  );
};

export default Post;
