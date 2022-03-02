// import { React, useEffect, useState } from "react";
// import axios from "axios";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [postId, setPostId] = useState("");

//   const handlePostComment = (e) => {
//     e.preventDefault();
//     console.log(`commentaire sur le post ${postId}`);

//     // axios({
//     //   method: "POST",
//     //   url: `${process.env.REACT_APP_API_URL}api/comment/${}`,
//     //   withCredentials: true,
//     //   data: {
//     //     user_email: email,
//     //     user_password: password,
//     //   },
//     // })
//     //   .then((res) => {
//     //     if (res.data.error) {
//     //       setErrors({
//     //         ...errors,
//     //         message: "Mauvaise combinaison Email / Mot de passe",
//     //       });
//     //     } else {
//     //       localStorage.setItem("user_info", JSON.stringify(res.data));
//     //       navigate("/");
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   };

//   return (
//     <div className="post-container-comments">
//       <div className="post-container-comments-comment">
//         <p className="comment-name">Axel Guichard</p>
//         <p className="comment-content">Salut les bogoss</p>
//       </div>
//       <div className="post-container-comments-comment">
//         <p className="comment-name">Axel Guichard</p>
//         <p className="comment-content">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
//           perspiciatis doloribus odio nulla quasi ex dicta voluptate! Quidem et
//           debitis ullam? Fuga reiciendis est a voluptatum quaerat ipsa numquam
//           hic?
//         </p>
//       </div>
//       <div className="post-container-comments-users">
//         <img
//           className="post-users-img"
//           src="./img/default-contact-img.png"
//           alt=""
//         />
//         <form action="" onSubmit={handlePostComment}>
//           <input
//             type="text"
//             placeholder="Écrivez un commentaire..."
//             className="input-comment"
//             onChange={(e) => {
//               setPostId(post.post_id);
//               setComment(e.target.value);
//             }}
//           />
//           <input type="submit" value="Poster" className="publish-comment" />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Comment;
