import { React, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
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
        //   res.data.forEach(post => {

        // })
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <div className="cc">{/* insérer ici les posts */}</div>
    </div>
  );
};

export default AllPosts;
