"use client";

import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "/api/auth/login"; // Redirect to your backend login endpoint
  };

  return (
    <div>
      <h2>Please Log In to Access the Page</h2>
      <button onClick={handleLogin}>Login with FFAstronauts</button>
    </div>
  );
};

export default Login;
