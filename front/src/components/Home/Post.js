import React, { useEffect, useRef, useState } from "react";
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
  const { post_id, post_user_id, reported } = post;
  const [allComments, setAllComments] = useState([]);
  const [longCommentError, setLongCommentError] = useState("");
  const [comment, setComment] = useState("");
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [reportMessage, setReportMessage] = useState(
    "Votre signalement a bien été enregistré."
  );
  const [reportedByUser, setReportedByUser] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const commentRef = useRef();

  const navigate = useNavigate();

  const handleProfilPage = () => {
    navigate(`/profil/${post_user_id}`);
  };

  const getProfilePicture = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/image/${post_user_id}`,
      withCredentials: true,
      params: {
        id: post_user_id,
      },
    })
      .then((res) => {
        if (res.data[0]) {
          setImageUrl(
            `${process.env.REACT_APP_API_URL}images/profils/${res.data[0].image_url}`
          );
        } else {
          setImageUrl(
            `${process.env.REACT_APP_API_URL}images/profils/default.png`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReport = () => {
    if (reported == 0) {
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
          setReportedByUser(true);
          fetchAllPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReportMessage("Ce post a déjà été signalé.");
      setReportedByUser(true);
    }
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
        userId,
      },
    })
      .then((res) => {
        setCountLikes(res.data[0].total);
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
        fetchAllPosts();
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
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
    getProfilePicture();
  }, [post]);

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
          <div
            className="post-container-top-img-container"
            onClick={(e) => navigate(`/profil/${post_user_id}`)}
          >
            <img
              className="post-users-img"
              src={imageUrl}
              alt="photo de profil"
            />
          </div>

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
              <span>J'aime</span>
            </button>
          )}
          {!isLiked && (
            <button onClick={handleLike} className="post-container-end__like">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="post-container-end__like-i"
              />
              <span>J'aime</span>
            </button>
          )}
          <button
            onClick={() => commentRef.current.focus()}
            className="post-container-end__comment"
          >
            <FontAwesomeIcon icon={faMessage} />
            <span>Commenter</span>
          </button>

          {isPostUser && (
            <button
              className="post-container-end__delete"
              onClick={() => {
                handleDelete(post.post_id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <span>Supprimer</span>
            </button>
          )}
          {!isPostUser && (
            <>
              <button
                onClick={handleReport}
                className="post-container-end__report"
              >
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </button>
            </>
          )}
          {reportedByUser && (
            <div className="reportMessage">
              <div className="reportMessageBox">
                <p>{reportMessage}</p>
                <button
                  onClick={() => {
                    setReportedByUser(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="post-container-comments">
        <Comments
          post={post}
          userId={userId}
          fetchAllComments={fetchAllComments}
          allComments={allComments}
          isAdmin={isAdmin}
        />
        <div className="post-container-comments-users">
          <PostComment
            post={post}
            userId={userId}
            fetchAllComments={fetchAllComments}
            comment={comment}
            setComment={setComment}
            commentRef={commentRef}
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
