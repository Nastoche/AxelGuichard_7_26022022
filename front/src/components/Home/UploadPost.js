import React, { useState } from "react";

const UploadPost = () => {
  const [uploadPost, setUploadPost] = useState("");

  const handleUploadPost = () => {};
  return (
    <div className="upload-post">
      <div className="form">
        <img src="./img/default-contact-img.png" alt="" />
        <form action="" onSubmit={handleUploadPost}>
          <input
            type="text"
            name="uploadpost"
            id="uploadpost"
            onChange={(e) => setUploadPost(e.target.value)}
            value={uploadPost}
          />
          <br />
          <input type="submit" value="Publier" className="login-btn" />
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
