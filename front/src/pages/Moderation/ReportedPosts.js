import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../components/Home/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/fr";

const ReportedPosts = ({ fetchReportedPosts, post, isAdmin, userId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [postId, setPostId] = useState("");
  const [postUserId, setPostUserId] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  const handleProfilPage = () => {
    navigate(`/profil/${postUserId}`);
  };

  const removeReport = () => {
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/report`,
      withCredentials: true,
      data: {
        postId: postId,
        isAdmin,
      },
    })
      .then((res) => {
        console.log("Retiré des signalements");
        // fetchReportedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchLikes = () => {
    // if (!postId === "") {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/postLikedByUser`,
      withCredentials: true,
      data: {
        postId: postId,
        userId: userId,
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
    // } else {
    //   console.log("problème fetch like");
    //   return;
    // }
  };

  const handleLikeCount = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/likeunlike`,
      withCredentials: true,
      data: {
        postId: postId,
        userId: userId,
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
        postId: postId,
        userId: userId,
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
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
      data: {
        post_id: postId,
        post_user_id: postUserId,
      },
    })
      .then((res) => {
        console.log("Post supprimé !");
        // fetchReportedPosts();
      })
      .catch((err) => {
        // console.log(`Echec suppression de post : ${err}`);
      });
    // refreshPage();
  };

  const fetchAllComments = (postId) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}/allcomments`,
      withCredentials: true,
      params: {
        id: postId,
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
    fetchReportedPosts();
    setFirstName(post.user_firstname);
    setLastName(post.user_lastname);
    setDateCreation(post.date_creation);
    setMessage(post.message);
    setPostId(post.post_id);
    setPostUserId(post.post_user_id);
    console.log(post.post_id);
  }, []);

  useEffect(() => {
    if (!postId == "") {
      handleLikeCount();
      fetchLikes();
    }
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
              key={`${userId}${dateCreation}`}
              className="post-container-top-name"
              onClick={handleProfilPage}
            >
              {firstName} {lastName}
            </p>
            <span
              key={`${postUserId}`}
              className="post-container-top-date"
              onClick={() => navigate(`/post/${postId}`)}
            >
              {moment(dateCreation).startOf("second").fromNow()}
            </span>
          </div>
        </div>
        <div className="post-container-message" key={`${postUserId}`}>
          {message}
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

          {isAdmin && (
            <button
              className="post-container-end__delete"
              onClick={() => {
                handleDelete(postId);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}
          <p onClick={removeReport}>Remove</p>
        </div>
      </div>
      <div className="post-container-comments">
        <Comments
          post={post}
          userId={userId}
          fetchAllComments={fetchAllComments}
          allComments={allComments}
        />
      </div>
    </>
  );
};

export default ReportedPosts;
