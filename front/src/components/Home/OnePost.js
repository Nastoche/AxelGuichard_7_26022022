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

const OnePost = ({ post, isAdmin, userId, fetchOnePost }) => {
  const [comment, setComment] = useState("");
  const [isPostUser, setIsPostUser] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const postId = useParams().id;

  const navigate = useNavigate();

  const handleProfilPage = () => {
    navigate(`/profil/${post.post_user_id}`);
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
    // console.log("user : " + userId + " " + "post : " + post_id);
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
        console.log("Post supprimé !");
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });

    navigate("/");
  };

  useEffect(() => {
    // fetchOnePost(postId);
    if (post.post_user_id === userId || isAdmin) {
      setIsPostUser(true);
    } else {
      setIsPostUser(false);
    }
    // console.log(post);
  }, [post]);
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
            onClick={handleProfilPage}
            className="post-container-top-name"
          >
            {post.user_firstname} {post.user_lastname}
          </p>
          <p key={post.user_lastname}>
            , {moment(post.date_creation).startOf("second").fromNow()}
          </p>
        </div>
        <div className="post-container-message" key={post.user_id}>
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
        <CommentsFromOnePost
          postId={postId}
          userId={userId}
          allComments={allComments}
          fetchCommentsFromOnePost={fetchCommentsFromOnePost}
        />
        <div className="post-container-comments-users">
          <PostCommentOnePost
            postId={postId}
            userId={userId}
            fetchCommentsFromOnePost={fetchCommentsFromOnePost}
          />
        </div>
      </div>
    </>
  );
};

export default OnePost;
