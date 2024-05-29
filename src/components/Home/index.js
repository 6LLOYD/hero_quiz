import React, { useState, Fragment, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userSession, setUserSession] = useState(null); // état pour gérer la session utilisateur
  const [userData, setUserData] = useState({}); // état pour stocker les données de l'utilisateur

  const navigate = useNavigate();

  // Effet pour écouter les changements d'état d'authentification
  useEffect(() => {
    // Écouteur pour les changements d'état d'authentification
    const listener = onAuthStateChanged(auth, (user) => {
      // Si l'utilisateur est authentifié, mettre à jour l'état userSession
      if (user) {
        setUserSession(user);
      } else {
        // Sinon, rediriger vers la page d'accueil
        navigate("/");
      }
    });

    // Nettoyage de l'écouteur d'état d'authentification lorsque le composant est démonté
    return () => listener();
  }, [navigate]); // Le tableau de dépendances inclut `navigate` pour s'assurer que l'effet est déclenché correctement

  // Effet pour charger les données utilisateur une fois que `userSession` est défini
  useEffect(() => {
    if (userSession) {
      // Référence au document utilisateur dans Firestore
      const colRef = user(userSession.uid);

      // Obtention du document utilisateur depuis Firestore
      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Si le document existe, mettre à jour l'état `userData` avec les données du document
            const docData = snapshot.data();
            setUserData(docData);
          }
        })
        .catch((error) => {
          // Gestion des erreurs lors de la récupération des données utilisateur
          console.log(error);
        });
    }
  }, [userSession]); // Le tableau de dépendances inclut `userSession` pour s'assurer que l'effet est déclenché lorsqu'il change

  return userSession === null ? (
    // Affichage du loader lorsque `userSession` est `null`
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Loading</p>
    </Fragment>
  ) : (
    // Affichage du contenu principal lorsque `userSession` est défini
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />{" "}
      </div>
    </div>
  );
};

export default Home;
