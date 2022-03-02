import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import ProfilComponents from "../../components/Profil/ProfilComponents";

const Profil = () => {
  document.title = `Groupomania - Mon Profil`;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("user_info")) {
  //     navigate("/login");
  //     return;
  //   }
  // });
  return (
    <>
      <Navbar />
      <ProfilComponents />
    </>
  );
};

export default Profil;
