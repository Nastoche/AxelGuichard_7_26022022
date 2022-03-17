import { React, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import CommentsFromOnePost from "../Post/CommentsFromOnePost";
import PostCommentOnePost from "../Post/PostCommentOnePost";
import moment from "moment";
import "moment/locale/fr";

const OnePost = ({ post, isAdmin, userId, fetchOnePost }) => {
  const [comment, setComment] = useState("");
  const [longCommentError, setLongCommentError] = useState("");
  const [isPostUser, setIsPostUser] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const postId = useParams().id;
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [reportMessage, setReportMessage] = useState(
    "Votre signalement a bien été enregistré."
  );
  const [reportedByUser, setReportedByUser] = useState(false);

  const navigate = useNavigate();

  const handleProfilPage = () => {
    navigate(`/profil/${post.post_user_id}`);
  };

  const handleReport = () => {
    if (post.reported == 0) {
      axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}api/post/${post.post_id}/report`,
        withCredentials: true,
        data: {
          postId: post.post_id,
          userId,
          isAdmin,
        },
      })
        .then((res) => {
          // console.log(`${post.post_id} reporté avec succès !`);
          setReportedByUser(true);
          fetchOnePost(post.post_id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReportMessage("Ce post a déjà été signalé.");
      setReportedByUser(true);
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    console.log(`commentaire sur le post ${postId}`);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
      withCredentials: true,
      data: {
        post_id: post.post_id,
        author_id: userId,
        message: comment,
      },
    })
      .then((res) => {
        fetchCommentsFromOnePost(postId);
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
  };

  const fetchLikes = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/postLikedByUser`,
      withCredentials: true,
      data: {
        userId,
        postId,
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
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/likeunlike`,
      withCredentials: true,
      data: {
        postId,
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
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/likeunlike`,
      withCredentials: true,
      data: {
        postId,
        userId,
      },
    })
      .then((res) => {
        // console.log(`Post ${postId} liké !`);

        handleLikeCount();
        // fetch all likes
      })
      .catch((err) => {
        console.log(`Echec like post : ${err}`);
      });
  };

  const fetchCommentsFromOnePost = (postId) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
      data: {
        post_id: postId,
        post_user_id: userId,
      },
    })
      .then((res) => {
        handleDeleteFromReports();
        console.log("Post supprimé !");
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });

    navigate("/");
  };

  const handleDeleteFromReports = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/deleteOneReportedPost`,
      withCredentials: true,
      data: {
        post_id: postId,
        user_id: userId,
      },
    })
      .then((res) => {
        console.log("Supprimé de la table Reports");
      })
      .catch((err) => {
        console.log(`Echec suppression de Report : ${err}`);
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
    if (userId > 0) {
      fetchLikes();
    }
  }, [handleLike]);
  return (
    <>
      <div className="post-container">
        <div className="post-container-top">
          <img
            className="post-users-img"
            src="../img/default-contact-img.png"
            alt=""
          />
          <div className="post-container-top-infos">
            <p
              key={post.user_firstname}
              onClick={handleProfilPage}
              className="post-container-top-name"
            >
              {post.user_firstname} {post.user_lastname}
            </p>
            <p key={post.user_lastname}>
              {moment(post.date_creation).startOf("second").fromNow()}
            </p>
          </div>
        </div>
        <div className="post-container-message" key={post.user_id}>
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
      {/* <Comment /> */}
      <div className="post-container-comments">
        <CommentsFromOnePost
          postId={postId}
          userId={userId}
          allComments={allComments}
          fetchCommentsFromOnePost={fetchCommentsFromOnePost}
          isAdmin={isAdmin}
        />
        <div className="post-container-comments-users">
          <PostCommentOnePost
            handlePostComment={handlePostComment}
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

export default OnePost;
