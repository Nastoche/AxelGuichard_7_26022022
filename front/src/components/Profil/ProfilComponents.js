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
            officiis autem nisi. Ab consequatur, voluptatibus nihil odit, optio
            officiis porro alias, quibusdam eius aperiam quod nisi. Enim
            voluptate expedita accusantium ducimus quibusdam sit nostrum.
            Ratione at consequatur placeat eius enim autem labore sapiente quis
            debitis aperiam harum quasi, beatae, impedit aspernatur ex
            voluptatibus nulla numquam ducimus iste ipsam expedita? Qui tenetur
            laboriosam placeat dolore deleniti eveniet nemo assumenda fuga, ea
            quam a, sint magnam voluptate? Debitis vero commodi, non amet
            excepturi ex sint eius magnam nobis iste aliquam delectus accusamus,
            repudiandae corporis. Ea reprehenderit quidem dolorum, culpa
            adipisci tempore, atque mollitia ipsum commodi autem obcaecati
            dignissimos laboriosam? Suscipit, unde est delectus optio, quae
            adipisci beatae nulla aliquid tempore alias veritatis necessitatibus
            inventore? Ab, animi? Voluptate, nisi sapiente suscipit
            necessitatibus, quia libero totam dolores quis quam optio corporis
            sed nobis illum beatae fugiat. Maiores quos, quia laboriosam totam,
            dolore, iste ipsam blanditiis dolores animi atque illum. Eaque id
            impedit ipsam perferendis dolor nulla? At labore fuga tempore velit
            rem? Veniam cupiditate quos voluptas laboriosam quae, maiores sit
            natus, et molestias modi libero, quia eveniet obcaecati ab
            doloremque incidunt iure provident facilis. Molestias sit nulla quis
            maxime nisi reprehenderit iusto adipisci perspiciatis voluptatum vel
            soluta voluptas eaque pariatur, nobis, ratione cum cupiditate neque
            officia ullam. Illo sit vitae repudiandae maiores, ut iusto placeat
            totam natus cumque, deserunt dolores corrupti nesciunt! Sed deserunt
            porro, voluptatum accusamus facilis quas iste exercitationem sunt
            cupiditate doloremque consectetur, labore totam, numquam cumque
            consequuntur tempora quidem quis necessitatibus voluptatibus. Itaque
            tempora voluptatum cupiditate ut, dolorum repudiandae tempore omnis!
            Suscipit, natus quae distinctio est, sed provident nisi esse
            accusamus atque aperiam, quis odit id quibusdam iusto cumque magni?
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilComponents;
