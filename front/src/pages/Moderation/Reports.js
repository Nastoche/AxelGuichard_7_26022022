import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportedPosts from "./ReportedPosts";

const Reports = ({ userId, isAdmin }) => {
  const [reports, setReports] = useState([]);

  const fetchReportedPosts = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/post/reportedPost`,
      withCredentials: true,
      params: {
        userId,
      },
    })
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchReportedPosts();
  }, []);
  return reports.map((post) => {
    console.log(post);
    return <ReportedPosts post={post} isAdmin={isAdmin} userId={userId} />;
  });
};

export default Reports;
