import React from "react";

export const Tittle = ({ label }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        {" "}
        {label === "login" ? "Login" : "Register"}{" "}
      </h1>
      <h2 className="text-sm font-light">
        {label === "login"
          ? "Welcome back, please login to continue"
          : "Create an account to continue"}
      </h2>
    </div>
  );
};
