import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import logout from "./logout.png";

const Logout = () => {
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (checked) {
      signOut(auth)
        .then(() => {
          console.log("dec");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        })
        .catch((error) => {
          // An error happened.
          console.error("Sign out error", error);
        });
    }
  }, [checked, navigate]);

  const handleLogout = () => {
    setChecked(true);
  };

  return (
    <div className="logoutContainer">
      <img
        src={logout}
        alt="Logout"
        onClick={handleLogout}
        style={{
          cursor: "pointer",
          width: "30px", // Taille fixe de l'image
          height: "auto",
          maxWidth: "100%", // Empêche l'image de dépasser la taille de son conteneur
          maxHeight: "100px", // Limite la hauteur maximale
        }}
      />
    </div>
  );
};

export default Logout;
