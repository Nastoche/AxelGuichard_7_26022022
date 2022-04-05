import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportedPosts from "./ReportedPosts";

const Reports = ({ userId, isAdmin, getNumberOfReports, isReportedPosts }) => {
  const [allReportedPosts, setAllReportedPosts] = useState([]);

  const fetchReportedPosts = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/reportedPost`,
      withCredentials: true,
      data: {
        user_id: userId,
      },
    })
      .then((res) => {
        setAllReportedPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchReportedPosts();
  }, []);
  return allReportedPosts.map((post, pos) => {
    return (
      <div className="key-posts" key={pos}>
        <ReportedPosts
          fetchReportedPosts={fetchReportedPosts}
          post={post}
          isAdmin={isAdmin}
          userId={userId}
          getNumberOfReports={getNumberOfReports}
        />
      </div>
    );
  });
};

export default Reports;
