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
      <h1 className="gray">$STEVE Airdrop Login</h1>
      <p className="content">
        <strong>
          <font className="coral">Thanks for watching my portfolio</font>
        </strong>
        , STEVE tokens are designed for the <strong>NEAR Challenge</strong>.{" "}
        <br />
        You can <strong>claim</strong> to get the initial tokens and{" "}
        <strong>transfer</strong> them immediately afterwards. For the{" "}
        <strong>UI design</strong>, I used the elements used in the previous
        challenge, representing my personal identity. Welcome to the awesome{" "}
        <strong>
          <font className="coral">STEVE WALLET</font>
        </strong>
      </p>
      <button onClick={() => signIn({ wallet, nearConfig })}>Login</button>
    </main>
  );
};

export default Login;
