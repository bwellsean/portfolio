import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useDocumentTitle("Arcade Login");

  const handleSuccess = () => {
    navigate("/arcade");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(assets/arcadeBg.png)] bg-center p-4">
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1>Arcade {isLogin ? "Login" : "Sign Up"}</h1>

        <div className="bg-purple-900 bg-opacity-40 p-6 rounded-lg">
          {isLogin ? (
            <Login
              onSuccess={handleSuccess}
              onSwitchToSignup={() => setIsLogin(false)}
            />
          ) : (
            <SignUp
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>

        <div className="mt-6 text-center text-gray-400">
          <p>You don't need an account to play games,</p>
          <p>but you'll need one to save high scores!</p>

          <button
            onClick={() => navigate("/arcade")}
            className="mt-4 text-purple-400 hover:text-purple-300 underline cursor-pointer"
          >
            Skip login and play games
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
