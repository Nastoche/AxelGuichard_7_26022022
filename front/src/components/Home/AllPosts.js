import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [postData, setPostData] = useState([]);
  // const [userFirstName, setUserFirstName] = useState("");
  // const [userLastName, setUserLastName] = useState("");
  // const [message, setMessage] = useState("");

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
          <div className="post-container">
            <div className="post-container-top">
              <p key={index}>
                {post.user_firstname} {post.user_lastname}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AllPosts;
