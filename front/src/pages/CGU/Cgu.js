import React from "react";
import TopLogoForm from "../../components/Log/TopLogoForm";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cgu = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Groupomania - Conditions d'utilisation</title>
      </Helmet>
      <TopLogoForm />
      <div className="cgu">
        <h1>Conditions générales d'utilisation</h1>
        <br />
        <p>
          1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          sapiente voluptas excepturi laboriosam ut exercitationem repudiandae
          eum dolorum, molestias suscipit deleniti ullam quo, aliquid rem
          dolorem veritatis dicta placeat, voluptates officia libero deserunt.
          Culpa sit error hic doloremque beatae dolore quos esse ex iure, fuga
          quo assumenda voluptate optio asperiores nulla quis a id odio
          praesentium itaque ab officia perspiciatis voluptas nam. Illum
          doloribus quibusdam assumenda, animi obcaecati, neque, nostrum soluta
          cum odit iusto excepturi in mollitia porro labore veniam atque
          repudiandae officia optio aut quae autem iure eum alias! Soluta,
          doloribus odit autem temporibus qui fugit animi est velit! Ad, odio
          facere ea natus temporibus nobis quis accusamus officia fugit voluptas
          ipsum tempore officiis, itaque quos est, aut porro necessitatibus
          consequatur doloribus laudantium animi minima non sapiente
          repellendus.
        </p>
        <br />
        <br />
        <p>
          2. Consequuntur aliquid dignissimos corrupti, consectetur rem culpa
          nulla repellat sequi nostrum nemo iusto? Mollitia earum rerum minus
          neque, nostrum perspiciatis odio illo, aliquid quibusdam, in quam
          tenetur pariatur esse asperiores? Quibusdam et molestiae dolorum
          tempore earum minima facilis, ad sed obcaecati praesentium temporibus
          voluptatem, vitae illo assumenda suscipit unde quisquam quis sit quae
          consequatur quas exercitationem natus. Reprehenderit, officia
          inventore enim consectetur veritatis sit, esse qui cum sed cupiditate
          dolorem alias ab totam tempora nobis nostrum soluta aspernatur. Libero
          soluta adipisci eaque ipsum, sint maiores reprehenderit vitae iure
          obcaecati! Ut facere ab unde doloribus impedit dicta, corrupti rerum,
          veniam mollitia saepe placeat eius minus nesciunt totam doloremque rem
          voluptatem sunt facilis iste ea soluta consequuntur perferendis
          cupiditate molestiae. Qui dignissimos eius delectus iusto totam quasi,
          at accusantium aliquam voluptatem error laudantium ab dolore obcaecati
          officia, architecto distinctio ducimus neque! Reprehenderit quisquam
          tenetur obcaecati iusto tempora est, temporibus fugiat.
        </p>
        <br />
        <br />
        <p>
          3. Ipsam laboriosam libero, pariatur modi hic non voluptatum. Quae,
          cum! Alias, autem ex? Culpa veritatis quaerat eveniet facere rem
          obcaecati sit laboriosam aliquam unde soluta autem animi sed velit
          esse, minus quia aperiam magnam id deserunt temporibus perferendis non
          laudantium dolor. Assumenda suscipit fugiat necessitatibus consectetur
          consequatur, quibusdam voluptate at. Suscipit vero ullam vitae
          numquam? Itaque in velit minima ex possimus a aliquid quis est,
          deserunt distinctio, totam ipsa blanditiis doloremque similique
          tempore dignissimos cum maiores dolores? Delectus dolores culpa, quae
          animi accusamus amet odio. Adipisci sapiente ut voluptas fugit ad non
          rem praesentium labore facere fugiat accusantium quaerat impedit
          cumque, numquam laudantium optio laborum inventore voluptate
          repudiandae temporibus itaque ab amet pariatur incidunt? Porro
          inventore cum similique et culpa nam dignissimos sint aliquid error
          laudantium voluptas, eveniet aliquam, illum velit? Excepturi obcaecati
          modi voluptate ipsa, eligendi culpa error mollitia tenetur totam saepe
          dolor dolorem praesentium corrupti impedit, necessitatibus sequi
          similique.
        </p>
        <br />
        <br />
        <p>
          4.Molestiae assumenda, possimus voluptas ipsum veritatis eum provident
          repellendus reiciendis doloribus ratione error obcaecati nesciunt
          veniam harum. Quibusdam autem dolor obcaecati quasi commodi eveniet
          corporis ex, possimus provident laboriosam blanditiis. Nesciunt omnis
          delectus, debitis architecto commodi ad dolores assumenda nostrum
          animi molestiae minus, fugit harum autem doloremque ex repellendus
          eum, dolore nihil aspernatur quos. Nisi officia facere expedita id
          odio maxime mollitia doloribus sequi sint! Quis, nihil ipsum dolorum
          amet exercitationem ad!
        </p>
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
    </>
  );
};

export default Cgu;
