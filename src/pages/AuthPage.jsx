import React from "react";
import Box from "../components/login/Box";
import "../styles/AuthPage.css";

const AuthPage = ({mode, wlogo = null, lsize, ssize}) => {
  return (
    <div className="login-box">
      {wlogo}
      <div className="flex select-none">
        <Box lsize={lsize} ssize={ssize}>
          {mode}
        </Box>
      </div>
    </div>
  );
};

export default AuthPage;
