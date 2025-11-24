// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden px-6">

      {/* Animated Robot Icon */}
      <div className="text-[10rem] md:text-[12rem] animate-bounce text-yellow-400 mb-6 drop-shadow-xl">
        <FaRobot />
      </div>

      {/* 404 Heading */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-gray-800 mb-4 animate-pulse">
        404
      </h1>

      {/* Message */}
      <p className="text-lg md:text-2xl text-gray-700 mb-8 text-center max-w-xl animate-fadeIn">
        Oops! The page you are looking for doesn’t exist.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition transform hover:scale-105 shadow-lg shadow-cyan-300/40"
      >
        Go Back Home
      </button>

      {/* Floating Decorative Circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-30 animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-300 rounded-full opacity-20 animate-spin-reverse-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-25 animate-bounce-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-cyan-200 rounded-full opacity-20 animate-bounce-slow"></div>
    </div>
  );
};

export default NotFound;
