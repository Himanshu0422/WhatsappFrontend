import React from "react";
import LoginForm from "../components/auth/LoginForm.js";

export default function Login() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex item-center justify-center py-[19px] overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <LoginForm />
      </div>
    </div>
  );
}
