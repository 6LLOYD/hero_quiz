import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Gestion valeur inputs
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  // Gestion Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid), { pseudo, email });
      })
      .then(() => {
        setLoginData({ ...data });
        navigate("/home");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  // Gestion btn inscription
  const { pseudo, email, password, confirmPassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  // Gestion erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  // Gestion deepNotes
  const styleEm = password.length >= 6 ? "green" : "red";

  const isPasswordMatch =
    password === confirmPassword &&
    password !== "" &&
    confirmPassword !== "" ? (
      <em
        style={{
          fontSize: "10px",
          color: "green",
        }}
      >
        - Les mots de passe sont identiques -
      </em>
    ) : (
      <em
        style={{
          fontSize: "10px",
          color: "red",
        }}
      >
        - Les mots de passe ne sont pas identiques -
      </em>
    );

  return (
    <div className="signUpLofinBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errorMsg}
              <h2>Inscription</h2>
              <div className="inputBox">
                <input
                  type="text"
                  id="pseudo"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={pseudo}
                />
                <label htmlFor="pseudo" className="">
                  Username
                </label>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  id="email"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={email}
                />
                <label htmlFor="email" className="">
                  Email
                </label>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  id="password"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={password}
                />

                <label htmlFor="password" className="">
                  Mot de passe
                </label>
              </div>
              <div
                className="inputBox"
                style={{
                  marginBottom: "70px",
                }}
              >
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={confirmPassword}
                />
                <label htmlFor="confirmPassword" className="">
                  Confirmer le mot de passe
                </label>
                {password.length > 1 && (
                  <em
                    style={{
                      fontSize: "10px",
                      color: styleEm,
                    }}
                  >
                    - le mot de passe doit contenir au moins 6 caractères -
                  </em>
                )}
                <br />
                {confirmPassword.length > 1 && isPasswordMatch}
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link to="/login" className="simpleLink">
                Déjà inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
