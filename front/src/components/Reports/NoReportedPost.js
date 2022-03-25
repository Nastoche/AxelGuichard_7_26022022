import React from "react";

const NoReportedPost = ({ navigate }) => {
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="no-reported-post">
        <p>Aucun post n'a été signalé.</p>
        <div className="btn-container">
          <button onClick={handleHomePage}>Revenir à l'accueil</button>
        </div>
      </div>
    </>
  );
};

export default NoReportedPost;
