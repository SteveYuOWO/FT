import React, { Component } from "react";
import "./login.css";
import STEVE from "../assets/icon.png";
import NEAR from "../assets/logo-white.svg";
import { signIn } from "../utils";

const Login = ({ wallet, nearConfig }) => {
  return (
    <main>
      <div className="profile">
        <img src={STEVE} width="300px" height="300px" alt="STEVE" />
        <img src={NEAR} width="300px" height="300px" alt="NEAR" />
      </div>
      <h1 className="gray">Rock paper scissors</h1>
      <p className="content">
        <strong>
          <font className="coral">Thanks</font>
        </strong>{" "}
        for watching my portfolio
        <br />
        <strong>
          <font className="coral">Rock paper scissors</font>
        </strong>
        , designed for <strong>near challenge</strong>
      </p>
      <button onClick={() => signIn({ wallet, nearConfig })}>Login</button>
    </main>
  );
};

export default Login;
