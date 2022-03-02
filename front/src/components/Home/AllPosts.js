import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [postData, setPostData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const userId = JSON.parse(localStorage.getItem("user_info")).user.user_id;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  src="./img/default-contact-img.png"
                  alt=""
                />
                <p
                  key={post.user_firstname}
                  className="post-container-top-name"
                >
                  {post.user_firstname} {post.user_lastname}
                </p>
                <p key={post.user_lastname}>
                  , le {post.date_creation.slice(0, 10)}
                </p>
              </div>
              <div className="post-container-message" key={index}>
                {post.message}
              </div>
              <hr />
              <div className="post-container-end">
                <span className="post-container-end__like">
                  {/* <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
                </span>
                <button className="post-container-end__comment">
                  Commenter
                </button>
              </div>
            </div>
            <div className="post-container-comments">
              <div className="post-container-comments-comment">
                <p className="comment-name">Axel Guichard</p>
                <p className="comment-content">Salut les bogoss</p>
              </div>
              <div className="post-container-comments-comment">
                <p className="comment-name">Axel Guichard</p>
                <p className="comment-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita perspiciatis doloribus odio nulla quasi ex dicta
                  voluptate! Quidem et debitis ullam? Fuga reiciendis est a
                  voluptatum quaerat ipsa numquam hic?
                </p>
              </div>
              <div className="post-container-comments-users">
                <img
                  className="post-users-img"
                  src="./img/default-contact-img.png"
                  alt=""
                />
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AllPosts;
