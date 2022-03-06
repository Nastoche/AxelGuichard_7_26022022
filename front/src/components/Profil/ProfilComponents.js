import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilComponents = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const userInfo = JSON.parse(localStorage.getItem("user_info")).user;
    setUserFirstName(userInfo.user_firstname);
    setUserLastName(userInfo.user_lastname);
  }, []);
  // console.log(userInfo);

  return (
    <>
      <div className="container-bloc">
        <div className="user-infos">
          <img
            className="user-infos-img"
            src="./img/default-contact-img.png"
            alt="profil"
          />
          <p className="user-infos-btn">Modifier ✏️</p>
          <h4 className="user-infos-name">
            {userFirstName} {userLastName}
          </h4>
          <hr />
          <p className="user-infos-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam,
            optio error? Aspernatur, minus voluptate nulla ratione animi
            pariatur cum maxime rem molestiae laboriosam doloribus aperiam quod
            hic odio quasi voluptas nisi explicabo. Consequuntur at eveniet eius
            numquam optio sunt libero, error, voluptate vero, tempore nulla
            tenetur. Recusandae non ut repellendus perferendis accusamus velit
            dolores illo, provident id sapiente hic, distinctio quis quae
            similique commodi aspernatur, eos corporis sed a facilis fugit
            dolor! Expedita minima quisquam, neque quidem nihil sapiente,
            consequatur nisi corporis vero perferendis quia nemo, enim repellat
            explicabo quam iure similique facilis delectus. Et accusamus quis
            impedit deleniti ducimus voluptate nobis soluta rerum dolorum quod
            quos esse doloribus provident dignissimos dolorem, est sequi
            blanditiis deserunt voluptatibus ab sed at? Labore, ipsa,
            asperiores, in optio adipisci illum unde perspiciatis excepturi
            officiis autem nisi.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilComponents;
