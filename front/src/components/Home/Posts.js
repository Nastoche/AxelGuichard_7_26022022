import React from "react";
import Post from "./Post";

const Posts = ({ allPosts, userId, fetchAllPosts }) => {
  // const [allPosts, setAllPosts] = useState([]);
  // const [userId, setUserId] = useState("");

  // const navigate = useNavigate();

  // const fetchAllPosts = () => {
  //   axios({
  //     method: "GET",
  //     url: `${process.env.REACT_APP_API_URL}api/post`,
  //     withCredentials: true,
  //     data: {
  //       user_id: userId,
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setAllPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   if (!localStorage.getItem("user_info")) {
  //     navigate("/login");
  //     return;
  //   }
  //   const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
  //     .user_id;
  //   setUserId(checkUserId);
  //   fetchAllPosts();
  // }, []);

  return allPosts.map((post) => {
    return <Post post={post} fetchAllPosts={fetchAllPosts} userId={userId} />;
  });
};

export default Posts;
