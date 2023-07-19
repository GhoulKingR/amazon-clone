import React, { useState } from "react";
import "./Login.css";
import AmazonLogo from "./assets/Amazon_logo.svg.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    // firebase register stuffs
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img src={AmazonLogo} className="login__logo" />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-main</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={signin}
          >
            Sign in
          </button>
        </form>
        <p>
          By signing-in you agree to AMAZON FAKE CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
