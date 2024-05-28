import React, { useState } from "react";

const SignUp = () => {
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const { pseudo, email, password, confirmPassword } = loginData;

  return (
    <div className="signUpLofinBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form>
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
                  type="text"
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
              <div className="inputBox">
                <input
                  type="text"
                  id="confirmPassword"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={confirmPassword}
                />
                <label htmlFor="confirmPassword" className="">
                  Confirmer le mot de passe
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
