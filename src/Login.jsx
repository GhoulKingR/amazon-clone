import React from "react";
import "./Login.css";
import AmazonLogo from "./assets/amazon-png-logo-vector-1.png";

function Login() {
  return (
    <div className="login">
      <img src={AmazonLogo} className="login__logo" />
    </div>
  );
}

export default Login;
