import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import CommentsFromOnePost from "../Post/CommentsFromOnePost";
import PostCommentOnePost from "../Post/PostCommentOnePost";
import moment from "moment";
import "moment/locale/fr";

const OnePost = ({ postData, isAdmin, userId }) => {
  const [comment, setComment] = useState("");
  const [isPostUser, setIsPostUser] = useState(false);
  const postId = useParams().id;

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleDelete = () => {
    // console.log("user : " + userId + " " + "post : " + post_id);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
      data: {
        postId,
        post_user_id: userId,
      },
    })
      .then((res) => {
        console.log("Post supprimé !");
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });

    navigate("/login");
  };

  const deletePost = () => {
    console.log(userId, postId);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials: true,
      data: {
        post_id: postId,
        // post_user_id: userId,
      },
    })
      .then((res) => {
        console.log("Post supprimé !");
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    console.log(`commentaire sur le post ${postId}`);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
      withCredentials: true,
      data: {
        post_id: postId,
        author_id: userId,
        message: comment,
      },
    })
      .then((res) => {
        console.log("commentaire créé !");
      })
      .catch((err) => {
        console.log(`Echec post commentaire : ${err}`);
      });
    refreshPage();
  };

  useEffect(() => {
    if (postData.post_user_id === userId || isAdmin) {
      setIsPostUser(true);
    }
  }, []);
  return (
    <>
      {postData.map((post, index) => {
        return (
          <>
            <div className="post-container">
              <div className="post-container-top">
                <img
                  className="post-users-img"
                  src="../img/default-contact-img.png"
                  alt=""
                />
                <p
                  key={post.user_firstname}
                  className="post-container-top-name"
                >
                  {post.user_firstname} {post.user_lastname}
                </p>
                <p key={post.user_lastname}>
                  , {moment(post.date_creation).startOf("second").fromNow()}
                </p>
              </div>
              <div className="post-container-message" key={index}>
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
            {/* <Comment /> */}
            <div className="post-container-comments">
              <CommentsFromOnePost postId={postId} userId={userId} />
              <div className="post-container-comments-users">
                <PostCommentOnePost postId={postId} userId={userId} />
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default OnePost;
