import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span>{error.message}</span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label htmlFor="email" className="">
                  Email
                </label>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  required
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <label htmlFor="password" className="">
                  Mot de passe
                </label>
              </div>
              {<button disabled={btn ? false : true}>Connexion</button>}
            </form>
            <div className="linkContainer">
              <Link to="/signup" className="simpleLink">
                Nouveau sur Super Hero quiz? Inscrivez-vous maintenant.
              </Link>
              <br />
              <Link to="/forgetpassword" className="simpleLink">
                Mot de passe oublié?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
